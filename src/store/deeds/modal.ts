import { Dispatch } from 'redux';
import { DeedTypes } from '.';
import { Modal } from '#interfaces';

export interface OpenModalDeed {
  type: DeedTypes.openModal;
  payload: Modal;
}

export const openModal = (modal: Modal) => (dispatch: Dispatch) => {
  dispatch<OpenModalDeed>({
    type: DeedTypes.openModal,
    payload: modal,
  });
};

export interface CloseModalDeed {
  type: DeedTypes.closeModal;
  payload?: null;
}

export const closeModal = () => (dispatch: Dispatch) => {
  dispatch<CloseModalDeed>({
    type: DeedTypes.closeModal,
  });
};
