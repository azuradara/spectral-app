import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState, Notification as _Notification } from '#interfaces';
import Notification from '#components/helpers/Notification';

const mapStateToProps = (state: GlobalState) => {
  return {
    notifications: state.notification.notifications,
  };
};

const connector = connect(mapStateToProps);

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const NotificationDispatcher = (props: ComponentProps): React.ReactElement => {
  return (
    <div
      className="notification-dispatcher"
      style={{ height: `${props.notifications.length * 75}px` }}
    >
      {props.notifications.map((notification: _Notification) => {
        const { title, message, id, type } = notification;

        return (
          <Notification
            title={title}
            id={id}
            message={message}
            type={type}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default connector(NotificationDispatcher);
