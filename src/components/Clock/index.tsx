import React, { ReactElement } from 'react';
import useClock from '../../lib/hooks/useClock';
import { GlobalState } from '../../lib/interfaces';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: GlobalState) => {
  return {
    user: state.user.user?.user,
  };
};

const connector = connect(mapStateToProps);

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const Clock = (props: ComponentProps): ReactElement => {
  const { minute, seconds, hour } = useClock();
  const { user } = props;

  return (
    <div className="clock">
      {/* TODO: Change this to user's display name instead of username when profile component is built */}
      {Boolean(user?.username) && (
        <div className="clock__msg">
          Welcome, <span className="clock__msg__name">{user?.username}</span>
        </div>
      )}
      <h2>
        {hour}:{minute}:{seconds}
      </h2>
    </div>
  );
};

export default connector(Clock);
