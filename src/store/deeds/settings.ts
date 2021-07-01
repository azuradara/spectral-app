import { Dispatch } from 'redux';
import { DeedTypes } from '.';
import { Settings } from '../../lib/interfaces';

export interface UpdateSettingsDeed {
  type: DeedTypes.updateSettings;
  payload: Settings;
}

export const updateSettings = (settings: Settings) => (dispatch: Dispatch) => {
  dispatch<UpdateSettingsDeed>({
    type: DeedTypes.updateSettings,
    payload: settings,
  });
};
