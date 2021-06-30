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

  console.log('went thru');

  return (
    <animated.div style={{ opacity: spring.opacity }} className="modal">
      <animated.div style={spring} className="modal-body">
        <div className="modal-close">
          <IcoBtn onClick={() => onCloseBtnClick()}>
            <CloseIcon />
          </IcoBtn>
        </div>
        {modal.modal?.content}
      </animated.div>
    </animated.div>
  );
};

export default connector(Modal);
