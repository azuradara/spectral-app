import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { clearNotification } from '../../../store/deeds';
import { animated, useSpring } from '@react-spring/web';

const NotificationConnector = connect(null, { clearNotification });

type NotificationProps = {
  title: string;
  message: string;
  type: 'error' | 'default';
  id: number;
} & ConnectedProps<typeof NotificationConnector>;

const Notification = (props: NotificationProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const spring = useSpring<{ opacity: string; transform: string }>({
    to: async (next) => {
      if (isOpen) {
        setShow(true);
        await next({ opacity: 1, transform: 'translate(0%, 0%)' });
        return;
      }

      await next({ opacity: 0, transform: 'translate(50%,0%)' });
      await setShow(false);
    },
  });

  React.useEffect(() => {
    setIsOpen(true);

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

  if (!show) return null;

  return (
    <animated.div
      style={spring}
      className={`notification notification--${props.type}`}
    >
      <h4 className="notification__title">{props.title}</h4>
      <p className="notification__message">{props.message}</p>
    </animated.div>
  );
};

export default NotificationConnector(Notification);
