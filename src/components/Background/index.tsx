import React, { ReactElement } from 'react';
import { GlobalState } from '../../lib/interfaces';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: GlobalState) => {
  return {
    bg: state.settings.settings.bg,
  };
};

const connector = connect(mapStateToProps);

type BackgroundProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const Background = (props: BackgroundProps): ReactElement => {
  const { bg } = props;
  console.log(bg);
  return (
    <div className="bg">
      <div
        className="bg-overlay"
        style={{
          background: `rgba(0,0,0,${bg.opacity})`,
          backdropFilter: `blur(${bg.blur}px)`,
        }}
      />
      {Boolean(bg.url) && <img src={bg.url} alt="bg" />}
    </div>
  );
};

export default connector(Background);
