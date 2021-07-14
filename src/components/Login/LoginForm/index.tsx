import React from 'react';

import { FormBtn, TextInput } from '#components/FormElements';
import { ConnectedProps, connect } from 'react-redux';
import { loginUser } from '#store/deeds';
import { reject, equals } from 'ramda';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const connector = connect(null, { loginUser });

type LoginFormProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const iValue = {
  identifier: '',
  password: '',
};

const LoginForm = (props: LoginFormProps): React.ReactElement => {
  const { loginUser } = props;

  return (
    <Formik
      validationSchema={yup.object().shape({
        identifier: yup.string().email(),
        password: yup.string(),
      })}
      onSubmit={async (e) => {
        await loginUser(e);
        console.log(e);
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
            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(LoginForm);
