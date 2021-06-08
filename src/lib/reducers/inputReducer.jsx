import * as DEED_TYPES from '../helpers/deed_types';

export const initialState = {
  input_change: '',
  input_submit: '',
};

export const inputReducer = (state = initialState, deed) => {
  switch (deed.type) {
    case DEED_TYPES.INPUT_CHANGE:
      return {
        ...state,
        input_change: deed.payload,
      };

    case DEED_TYPES.INPUT_SUBMIT:
      return {
        ...state,
        input_submit: deed.payload,
      };

    default:
      return state;
  }
};
