import { DeedTypes, Deed } from '../deeds';
import { Notification } from '../../lib/interfaces';

export interface State {
  notifications: Notification[];
  count: number;
}

const iState: State = {
  notifications: [],
  count: 0,
};

const createNotification = (state: State, deed: Deed): State => {
  const placeholder = [
    ...state.notifications,
    {
      ...deed.payload,
      id: state.count,
    },
  ];
  return {
    ...state,
    notifications: placeholder,
    count: state.count + 1,
  };
};

// no idea if this works but immutables are cringe

const clearNotification = (state: State, deed: Deed): State => {
  const placeholder = [...state.notifications].filter(
    (notification: Notification) => notification.id !== deed.payload
  );

  return {
    ...state,
    notifications: placeholder,
  };
};

const notificationReducer = (state = iState, deed: Deed) => {
  switch (deed.type) {
    case DeedTypes.createNotification:
      return createNotification(state, deed);

    case DeedTypes.clearNotification:
      return clearNotification(state, deed);

    default:
      return state;
  }
};

export default notificationReducer;
