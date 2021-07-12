import React, { SyntheticEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { LoginData, GlobalState } from '#interfaces';
import { loginUser } from '#store/deeds';
import { useHistory } from 'react-router';
import { State } from '#store/reducers/auth';

interface ComponentProps {
  loginUser: (formData: LoginData) => void;
  user: State;
}

// TODO: Fix props validation on the *user* property

const Login = (props: ComponentProps): JSX.Element => {
  const [formData, setFormData] = useState<LoginData>({
    identifier: '',
    password: '',
  });

  const history = useHistory();

  // TODO:(azuradara) revisit redirects

  const submitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle submit
    if (formData.password && formData.identifier) {
      await props.loginUser(formData);

      if (props.user !== null) {
        history.push('/');
      }
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
