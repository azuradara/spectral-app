import { State as FavoriteState } from '../../store/reducers/favorite';
import { State as UserState } from '../../store/reducers/auth';

export interface GlobalState {
  favorite: FavoriteState;
  user: UserState;
}
