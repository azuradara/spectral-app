import { combineReducers } from 'redux';

import { GlobalState } from '../../lib/interfaces/GlobalState';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import AuthReducer from './auth';
import favoriteReducer from './favorite';
import ModalReducer from './modal';
import SettingsReducer from './settings';
import notificationReducer from './notification';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'settings'],
};

const rootReducer = combineReducers<GlobalState>({
  favorite: favoriteReducer,
  user: AuthReducer,
  modal: ModalReducer,
  settings: SettingsReducer,
  notification: notificationReducer,
});

export default persistReducer(persistConfig, rootReducer);
