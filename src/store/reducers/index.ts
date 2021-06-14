import { combineReducers } from 'redux';

import { GlobalState } from '../../lib/interfaces/GlobalState';

import favoriteReducer from './favorite';

const rootReducer = combineReducers<GlobalState>({
  favorite: favoriteReducer,
});

export default rootReducer;
