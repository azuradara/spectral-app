import { Dispatch } from 'redux';
import { actionTypes } from '#store/actions';
import { NewNotification } from '#interfaces';

export interface CreateNotificationaction {
  type: actionTypes.createNotification;
  payload: NewNotification;
}

export const createNotification =
  (notification: NewNotification) => (dispatch: Dispatch) => {
    dispatch<CreateNotificationaction>({
      type: actionTypes.createNotification,
      payload: notification,
    });
  };

export interface ClearNotificationaction {
  type: actionTypes.clearNotification;
  payload: number;
}

export const clearNotification = (id: number) => (dispatch: Dispatch) => {
  dispatch<ClearNotificationaction>({
    type: actionTypes.clearNotification,
    payload: id,
  });
};
