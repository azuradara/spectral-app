import React from 'react';

import { LoginBtn, TextInput } from '#components/FormElements';
import { ConnectedProps, connect } from 'react-redux';
import { loginUser } from '#store/actions';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { GlobalState } from '#interfaces';

const mapStateToProps = (state: GlobalState) => {
  return {
    user: state.user,
  };
};

const connector = connect(mapStateToProps, { loginUser });

type LoginFormProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const iValue = {
  identifier: '',
  password: '',
};

const LoginForm = (props: LoginFormProps): React.ReactElement => {
  const { loginUser } = props;
  const { push } = useHistory();

  return (
    <Formik
      validationSchema={yup.object().shape({
        identifier: yup.string().required().email(),
        password: yup.string().required(),
      })}
      onSubmit={async (e) => {
        await loginUser(e);
        return push('/');
      }}
      initialValues={{
        ...iValue,
      }}
    >
      {(formik) => {
        return (
          <Form>
            <TextInput name="identifier" label="Identifier" />
            <TextInput name="password" label="Password" type="password" />
            <span>
              <a className="form-control__helper" href="#">
                Forgot your password?
              </a>
            </span>
            <div className="form-control__submission">
              <LoginBtn />
            </div>
            <span className="form-control__helper">
              Need an account?{' '}
              <a
                href="https://spectral-web.vercel.app"
                className="form-control__helper--link"
              >
                Register
              </a>
            </span>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(LoginForm);
