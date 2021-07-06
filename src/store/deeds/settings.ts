import { Dispatch } from 'redux';
import { DeedTypes } from '.';
import { Settings } from '../../lib/interfaces';
import { CreateNotificationDeed } from './notification';

export interface UpdateSettingsDeed {
  type: DeedTypes.updateSettings;
  payload: Settings;
}

export const updateSettings = (settings: Settings) => (dispatch: Dispatch) => {
  dispatch<UpdateSettingsDeed>({
    type: DeedTypes.updateSettings,
    payload: settings,
  });

  dispatch<CreateNotificationDeed>({
    type: DeedTypes.createNotification,
    payload: {
      title: 'Success',
      message: 'Settings updated.',
      type: 'default',
    },
  });
};