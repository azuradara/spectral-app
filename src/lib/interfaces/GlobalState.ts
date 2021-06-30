import { State as FavoriteState } from '../../store/reducers/favorite';
import { State as UserState } from '../../store/reducers/auth';
import { State as ModalState } from '../../store/reducers/modal';
export interface GlobalState {
  favorite: FavoriteState;
  user: UserState;
  modal: ModalState;
}
