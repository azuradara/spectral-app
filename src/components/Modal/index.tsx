import React from 'react';
import { IcoBtn } from '../helpers';
import CloseIcon from '../../Icons/CloseIcon';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '../../lib/interfaces';
import { closeModal } from '../../store/deeds';

const mapStateToProps = (state: GlobalState) => ({
  modal: state.modal,
});

const connector = connect(mapStateToProps, { closeModal });

type ModalProps = Record<string, unknown> & ConnectedProps<typeof connector>;

const Modal = (props: ModalProps) => {
  const { closeModal, modal } = props;

  if (!modal.open) return null;

  const onCloseBtnClick = () => closeModal();

  console.log('went thru');

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-close">
          <IcoBtn onClick={() => onCloseBtnClick()}>
            <CloseIcon />
          </IcoBtn>
        </div>
        {modal.modal?.content}
      </div>
    </div>
  );
};

export default connector(Modal);
