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
      {Boolean(user) && <div className="clock-msg">{user?.username}</div>}
      <h2>
        {hour}:{minute}:{seconds}
      </h2>
    </div>
  );
};

export default connector(Clock);
