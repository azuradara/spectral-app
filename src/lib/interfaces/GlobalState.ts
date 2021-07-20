import { State as FavoriteState } from '#store/reducers/favorite';
import { State as UserState } from '#store/reducers/auth';
import { State as ModalState } from '#store/reducers/modal';
import { State as SettingsState } from '#store/reducers/settings';
import { State as NotificationState } from '#store/reducers/notification';
import { State as TaskState } from '#store/reducers/task';
export interface GlobalState {
  favorite: FavoriteState;
  user: UserState;
  modal: ModalState;
  settings: SettingsState;
  notification: NotificationState;
  task: TaskState;
}
