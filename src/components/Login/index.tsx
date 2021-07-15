import ParticleBackground from '#components/shared/ParticleBackground';
import React from 'react';

import LoginForm from './LoginForm';

const Login = (): React.ReactElement => {
  return (
    <>
      <div className="login">
        <ParticleBackground />
        <div className="overlay" />
        <div className="login__form">
          <h1>Welcome back!</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
