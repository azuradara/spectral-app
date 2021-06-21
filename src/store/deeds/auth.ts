import axios from 'axios';
import { Dispatch } from 'redux';

import { DeedTypes } from '.';
import { CreateNotificationDeed } from '.';
import { ApiResponse, LoginData, User } from '../../lib/interfaces';

// LOGIN USER

export interface LoginUserDeed<T> {
  type:
    | DeedTypes.loginUser
    | DeedTypes.loginUserError
    | DeedTypes.loginUserSuccess;
  payload: T;
}

export const loginUser =
  (formData: LoginData) => async (dispatch: Dispatch) => {
    dispatch<LoginUserDeed<undefined>>({
      type: DeedTypes.loginUser,
      payload: undefined,
    });

    try {
      const res = await axios.post<ApiResponse<User>>('/auth/login', formData);

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `User ${res.data.data.user.username} logged in.`,
        },
      });

      dispatch<LoginUserDeed<User>>({
        type: DeedTypes.loginUserSuccess,
        payload: res.data.data,
      });

      localStorage.setItem('token', res.data.data.token);
    } catch (err) {
      console.log(err);
    }
  };
