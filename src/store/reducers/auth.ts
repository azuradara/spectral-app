import { DeedTypes, Deed } from '../deeds';

import { User } from '../../lib/interfaces';

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

const loginUser = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const loginUserSuccess = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: false,
    user: deed.payload,
  };
};

const loginUserError = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: false,
    err: deed.payload,
  };
};

const AuthReducer = (state: State = initState, deed: Deed): State => {
  switch (deed.type) {
    case DeedTypes.loginUser:
      return loginUser(state, deed);

    case DeedTypes.loginUserSuccess:
      return loginUserSuccess(state, deed);

    case DeedTypes.loginUserError:
      return loginUserError(state, deed);

    default:
      return state;
  }
};

export default AuthReducer;
