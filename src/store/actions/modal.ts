import { Dispatch } from 'redux';
import { actionTypes } from '.';
import { Modal } from '#interfaces';

export interface OpenModalaction {
  type: actionTypes.openModal;
  payload: Modal;
}

export const openModal = (modal: Modal) => (dispatch: Dispatch) => {
  dispatch<OpenModalaction>({
    type: actionTypes.openModal,
    payload: modal,
  });
};

export interface CloseModalaction {
  type: actionTypes.closeModal;
  payload?: null;
}

export const closeModal = () => (dispatch: Dispatch) => {
  dispatch<CloseModalaction>({
    type: actionTypes.closeModal,
  });
};
