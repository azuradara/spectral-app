import { actionTypes, Action } from '#store/actions';

import { User } from '#interfaces';

export interface State {
  seeking: boolean;
  err: string | undefined;
  user: User | null;
}

const initState: State = {
  seeking: true,
  err: undefined,
  user: null,
};

const loginUser = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const loginUserSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: false,
    user: action.payload,
  };
};

const loginUserError = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: false,
    err: action.payload,
  };
};

const logoutUser = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: false,
    err: undefined,
    user: null,
  };
};

const AuthReducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case actionTypes.loginUser:
      return loginUser(state, action);

    case actionTypes.loginUserSuccess:
      return loginUserSuccess(state, action);

    case actionTypes.loginUserError:
      return loginUserError(state, action);

    case actionTypes.logoutUser:
      return logoutUser(state, action);

    default:
      return state;
  }
};

export default AuthReducer;
