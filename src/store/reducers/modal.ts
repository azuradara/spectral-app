import { DeedTypes, Deed, OpenModalDeed } from '#store/deeds';
import { Modal } from '#interfaces';

export interface State {
  modal: Modal | null;
  open: boolean;
}

const initState: State = {
  modal: null,
  open: false,
};

const openModal = (state: State, deed: OpenModalDeed): State => {
  return {
    ...state,
    modal: deed.payload,
    open: true,
  };
};

const closeModal = (state: State, deed: Deed): State => {
  return {
    ...state,
    // modal: null,
    open: false,
  };
};

const ModalReducer = (state: State = initState, deed: Deed): State => {
  switch (deed.type) {
    case DeedTypes.openModal:
      return openModal(state, deed);

    case DeedTypes.closeModal:
      return closeModal(state, deed);

    default:
      return state;
  }
};

export default ModalReducer;
