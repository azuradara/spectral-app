import { actionTypes, action } from '#store/actions';
import { Notification } from '#interfaces';

export interface State {
  notifications: Notification[];
  count: number;
}

const iState: State = {
  notifications: [],
  count: 0,
};

const createNotification = (state: State, action: action): State => {
  const placeholder = [
    ...state.notifications,
    {
      ...action.payload,
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

const clearNotification = (state: State, action: action): State => {
  const placeholder = [...state.notifications].filter(
    (notification: Notification) => notification.id !== action.payload
  );

  return {
    ...state,
    notifications: placeholder,
  };
};

const notificationReducer = (state = iState, action: action) => {
  switch (action.type) {
    case actionTypes.createNotification:
      return createNotification(state, action);

    case actionTypes.clearNotification:
      return clearNotification(state, action);

    default:
      return state;
  }
};

export default notificationReducer;
