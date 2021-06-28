import * as React from 'react';
import { useModalCtx } from '../../lib/modal/ModalCtx';
import Modal from '../Modal';

// eslint-disable-next-line react/prop-types
const SettingsModal: React.FC<{ id: string }> = ({ id }) => {
  const { closeModal } = useModalCtx();
  return (
    <Modal id={id} title="AE">
      ye
    </Modal>
  );
};

export default SettingsModal;
