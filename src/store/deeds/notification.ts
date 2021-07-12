import { Dispatch } from 'redux';
import { DeedTypes } from '.';
import { NewNotification } from '$interfaces';

export interface CreateNotificationDeed {
  type: DeedTypes.createNotification;
  payload: NewNotification;
}

export const createNotification =
  (notification: NewNotification) => (dispatch: Dispatch) => {
    dispatch<CreateNotificationDeed>({
      type: DeedTypes.createNotification,
      payload: notification,
    });
  };

export interface ClearNotificationDeed {
  type: DeedTypes.clearNotification;
  payload: number;
}

export const clearNotification = (id: number) => (dispatch: Dispatch) => {
  dispatch<ClearNotificationDeed>({
    type: DeedTypes.clearNotification,
    payload: id,
  });
};
