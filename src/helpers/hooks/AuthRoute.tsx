import React from 'react';

import { Redirect, Route } from 'react-router';
import { GlobalState } from '#interfaces';
import { connect } from 'react-redux';

const AuthRoute = (props: any) => {
  if (!props.user.user) return <Redirect to="/login" />;
  return <Route {...props} />;
};

const mapStateToProps = (state: GlobalState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AuthRoute);

// TODO: convert this to a hook
