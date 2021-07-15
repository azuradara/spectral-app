import { actionTypes, action } from '#store/actions';
import { Settings } from '#interfaces';

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
    bookmarks: {
      category_columns: 2,
    },
  },
};

// TODO: revisit and separate settings actions into their functionality
// instead of passing the whole settings object every time something
// is changed.

const updateSettings = (state: State, action: action): State => {
  return {
    ...state,
    settings: action.payload,
  };
};

const SettingsReducer = (state: State = initState, action: action): State => {
  switch (action.type) {
    case actionTypes.updateSettings:
      return updateSettings(state, action);

    default:
      return state;
  }
};

export default SettingsReducer;
