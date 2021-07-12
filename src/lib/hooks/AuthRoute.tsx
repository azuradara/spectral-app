import React from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import { GlobalState } from '#interfaces';

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
