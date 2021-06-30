import React from 'react';
import { IcoBtn } from '../helpers';
import CloseIcon from '../../Icons/CloseIcon';
import { connect, ConnectedProps } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import { GlobalState } from '../../lib/interfaces';
import { closeModal } from '../../store/deeds';

const mapStateToProps = (state: GlobalState) => ({
  modal: state.modal,
});

const connector = connect(mapStateToProps, { closeModal });

type ModalProps = Record<string, unknown> & ConnectedProps<typeof connector>;

const Modal = (props: ModalProps) => {
  const { closeModal, modal } = props;

  const [show, setShow] = React.useState<boolean>(false);

  const spring = useSpring<{ opacity: string; transform: string }>({
    to: async (next) => {
      if (modal.open) {
        setShow(true);
        await next({ opacity: 1, transform: 'translate(0%,0%)' });
        return;
      }
      await next({ opacity: 0, transform: 'translate(0%,20%)' });
      await setShow(false);
    },
  });

  if (!show) return null;

  const onCloseBtnClick = () => closeModal();

  return (
    <animated.div style={{ opacity: spring.opacity }} className="modal">
      <animated.div style={spring} className="modal-body">
        <IcoBtn className="modal-close" onClick={() => onCloseBtnClick()}>
          <CloseIcon />
        </IcoBtn>
        <div className="modal-body__title">
          <h2>{modal.modal?.title}</h2>
        </div>
        <div className="modal-body__content">{modal.modal?.content}</div>
      </animated.div>
    </animated.div>
  );
};

export default connector(Modal);
