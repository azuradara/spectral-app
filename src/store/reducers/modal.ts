import { actionTypes, action, OpenModalaction } from '#store/actions';
import { Modal } from '#interfaces';

export interface State {
  modal: Modal | null;
  open: boolean;
}

const initState: State = {
  modal: null,
  open: false,
};

const openModal = (state: State, action: OpenModalaction): State => {
  return {
    ...state,
    modal: action.payload,
    open: true,
  };
};

const closeModal = (state: State, action: action): State => {
  return {
    ...state,
    // modal: null,
    open: false,
  };
};

const ModalReducer = (state: State = initState, action: action): State => {
  switch (action.type) {
    case actionTypes.openModal:
      return openModal(state, action);

    case actionTypes.closeModal:
      return closeModal(state, action);

    default:
      return state;
  }
};

export default ModalReducer;
