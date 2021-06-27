import { combineReducers } from 'redux';

import { GlobalState } from '../../lib/interfaces/GlobalState';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import AuthReducer from './auth';
import favoriteReducer from './favorite';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers<GlobalState>({
  favorite: favoriteReducer,
  user: AuthReducer,
});

export default persistReducer(persistConfig, rootReducer);
