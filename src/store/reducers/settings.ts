import { DeedTypes, Deed } from '../deeds';
import { Settings } from '../../lib/interfaces';

// Just to keep consistency
export interface State {
  settings: Settings;
}

const initState: State = {
  settings: {
    bg: {
      url: '',
      opacity: 0,
      blur: 0,
    },
  },
};

// TODO: revisit and separate settings actions into their functionality
// instead of passing the whole settings object every time something
// is changed.

const updateSettings = (state: State, deed: Deed): State => {
  return {
    ...state,
    settings: deed.payload,
  };
};

const SettingsReducer = (state: State = initState, deed: Deed): State => {
  switch (deed.type) {
    case DeedTypes.updateSettings:
      return updateSettings(state, deed);

    default:
      return state;
  }
};

export default SettingsReducer;
