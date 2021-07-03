import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { clearNotification } from '../../../store/deeds';

const NotificationConnector = connect(null, { clearNotification });

type NotificationProps = {
  title: string;
  message: string;
  type: 'error' | 'default';
  id: number;
} & ConnectedProps<typeof NotificationConnector>;

const Notification = (props: NotificationProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    const closeNotification = setTimeout(() => {
      setIsOpen(false);
    }, 3500);

    const clearNotification = setTimeout(() => {
      props.clearNotification(props.id);
    }, 3600);

    return () => {
      window.clearTimeout(closeNotification);
      window.clearTimeout(clearNotification);
    };
  }, []);

  return (
    <div className={`notification notification--${props.type}`}>
      <h4 className="notification__title">{props.title}</h4>
      <p className="notification__message">{props.title}</p>
    </div>
  );
};

export default NotificationConnector(Notification);
