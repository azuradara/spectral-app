import React, { ReactElement } from 'react';
import useClock from '../../lib/hooks/useClock';

const Clock = (): ReactElement => {
  const { minute, seconds, hour } = useClock();

  return (
    <div className="clock">
      <div className="clock-msg">~</div>
      <h2>
        {hour}:{minute}:{seconds}
      </h2>
    </div>
  );
};

export default Clock;
