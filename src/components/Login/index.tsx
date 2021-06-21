import React, { SyntheticEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { LoginData, GlobalState } from '../../lib/interfaces';
import { loginUser } from '../../store/deeds';

interface ComponentProps {
  loginUser: (formData: LoginData) => void;
}

const Login = (props: ComponentProps): JSX.Element => {
  const [formData, setFormData] = useState<LoginData>({
    identifier: '',
    password: '',
  });

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // handle submit
    if (formData.password && formData.identifier) {
      props.loginUser(formData);
    } else {
      console.log('nae');
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="_login">
      <form className="_login_form" onSubmit={(e) => submitHandler(e)}>
        <h1>Log in</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={(e) => inputHandler(e)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => inputHandler(e)}
        />

        <button className="btn btn--primary">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    user: state.user,
  };
};

const dispatchMap = {
  loginUser,
};

export default connect(mapStateToProps, dispatchMap)(Login);
