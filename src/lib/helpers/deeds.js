import * as DEED_TYPES from './deed_types';

export const input_change = (text) => {
  return {
    type: DEED_TYPES.INPUT_CHANGE,
    payload: text,
  };
};

export const input_submit = (text) => {
  return {
    type: DEED_TYPES.INPUT_CHANGE,
    payload: text,
  };
};
