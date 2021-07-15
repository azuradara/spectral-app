import axios from 'axios';
import { Dispatch } from 'redux';

import { actionTypes } from '.';
import { CreateNotificationaction } from '.';
import { ApiResponse, LoginData, User } from '#interfaces';

// LOGIN USER

export interface LoginUseraction<T> {
  type:
    | actionTypes.loginUser
    | actionTypes.loginUserError
    | actionTypes.loginUserSuccess;
  payload: T;
}

export const loginUser =
  (formData: LoginData) => async (dispatch: Dispatch) => {
    dispatch<LoginUseraction<undefined>>({
      type: actionTypes.loginUser,
      payload: undefined,
    });

    try {
      const res = await axios.post<ApiResponse<User>>('/auth/login', formData);

      if (res.data.error) {
        console.log('err');
        return dispatch<CreateNotificationaction>({
          type: actionTypes.createNotification,
          payload: {
            title: 'error',
            message: 'Invalid Credentials',
            type: 'error',
          },
        });
      }

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'success',
          message: `User ${res.data.data.user.username} logged in.`,
          type: 'default',
        },
      });

      dispatch<LoginUseraction<User>>({
        type: actionTypes.loginUserSuccess,
        payload: res.data.data,
      });

      localStorage.setItem('token', res.data.data.token);

      return res;
    } catch (err) {
      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Invalid credentials',
          message: 'Please try again.',
          type: 'error',
        },
      });
    }
  };

export interface LogoutUseraction {
  type: actionTypes.logoutUser;
  payload: null;
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  dispatch<LogoutUseraction>({
    type: actionTypes.logoutUser,
    payload: null,
  });

  try {
    await axios.post<ApiResponse<string>>('/auth/logout');
  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem('token');
};
