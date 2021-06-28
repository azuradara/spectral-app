/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import concoct_id from '../helpers/concoct_id';

interface ModalState {
  content: string;
  openModal: (e: string) => void;
  closeModal: () => void;
}

export const MODAL_SRC_ID = 'modal-src';

const iState: ModalState = {
  content: '',
  openModal: () => {},
  closeModal: () => {},
};

const ModalCtx = React.createContext(iState);

export const useModalCtx: () => ModalState = () => React.useContext(ModalCtx);

export const useModal = (): [
  () => { id: string },
  () => { onClick: (e: React.MouseEvent) => any }
] => {
  const id = React.useRef(concoct_id());
  const { openModal } = useModalCtx();

  return [
    () => ({ id: id.current }),
    () => ({
      onClick: (e: React.MouseEvent) => {
        if (typeof e.preventDefault === 'function') {
          e.preventDefault();
        }

        openModal(id.current);
      },
    }),
  ];
};

// eslint-disable-next-line react/prop-types
const ModalSrc: React.FC<any> = ({ children }) => {
  const [content, setModal] = React.useState<string>('');
  const openModal = (e: string) => setModal(e);
  const closeModal = () => setModal('');

  return (
    <ModalCtx.Provider value={{ content, openModal, closeModal }}>
      <div id={MODAL_SRC_ID} />
      {children}
    </ModalCtx.Provider>
  );
};

export default ModalSrc;
