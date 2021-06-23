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

      if (res.data.error) {
        console.log('err');
        return dispatch<CreateNotificationDeed>({
          type: DeedTypes.createNotification,
          payload: {
            title: 'error',
            message: 'Invalid Credentials',
          },
        });
      }

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

export interface LogoutUserDeed {
  type: DeedTypes.logoutUser;
  payload: null;
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  dispatch<LogoutUserDeed>({
    type: DeedTypes.logoutUser,
    payload: null,
  });

  try {
    await axios.post<ApiResponse<string>>('/auth/logout');
  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem('token');
};
