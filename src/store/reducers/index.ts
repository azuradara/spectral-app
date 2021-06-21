import { combineReducers } from 'redux';

import { GlobalState } from '../../lib/interfaces/GlobalState';

import AuthReducer from './auth';
import favoriteReducer from './favorite';

const rootReducer = combineReducers<GlobalState>({
  favorite: favoriteReducer,
  user: AuthReducer,
});

export default rootReducer;
