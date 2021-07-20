import { Dispatch } from 'redux';
import { actionTypes } from '.';
import { Settings } from '#interfaces';
import { CreateNotificationaction } from '#store/actions';

export interface UpdateSettingsaction {
  type: actionTypes.updateSettings;
  payload: Settings;
}

export const updateSettings = (settings: Settings) => (dispatch: Dispatch) => {
  dispatch<UpdateSettingsaction>({
    type: actionTypes.updateSettings,
    payload: settings,
  });

  dispatch<CreateNotificationaction>({
    type: actionTypes.createNotification,
    payload: {
      title: 'Success',
      message: 'Settings updated.',
      type: 'default',
    },
  });
};
