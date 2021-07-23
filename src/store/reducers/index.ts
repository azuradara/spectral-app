import { combineReducers } from 'redux';

import { GlobalState } from '#interfaces';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import AuthReducer from '#store/reducers/auth';
import favoriteReducer from '#store/reducers/favorite';
import ModalReducer from '#store/reducers/modal';
import SettingsReducer from '#store/reducers/settings';
import notificationReducer from '#store/reducers/notification';
import taskReducer from '#store/reducers/task';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'settings', 'favorite', 'task'],
};

/**
 * TODO: https://github.com/edy/redux-persist-transform-filter
 * persist nested pinnedFavorites only instead
 * of entire favorites state
 */

const rootReducer = combineReducers<GlobalState>({
  favorite: favoriteReducer,
  user: AuthReducer,
  modal: ModalReducer,
  settings: SettingsReducer,
  notification: notificationReducer,
  task: taskReducer,
});

export default persistReducer(persistConfig, rootReducer);
