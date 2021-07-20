import LoginParticleBackground from '#components/shared/ParticleBackground/tuski';
import React from 'react';

import LoginForm from './LoginForm';

const Login = (): React.ReactElement => {
  return (
    <>
      <div className="login">
        <LoginParticleBackground />
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
