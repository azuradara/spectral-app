import * as React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { FormBtn, TextInput } from '#components/FormElements';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import { updateSettings, closeModal } from '#store/actions';
import { equals, reject } from 'ramda';

const iValue = {
  weather: {
    location: 'Frankfurt',
    units: 'metric',
  },
};

const mapStateToProps = (state: GlobalState) => ({
  initialSettings: state.settings.settings,
});

const connector = connect(mapStateToProps, { updateSettings, closeModal });

type SettingsModalProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const SettingsWeather = (props: SettingsModalProps): React.ReactElement => {
  const { updateSettings, initialSettings, closeModal } = props;

  return (
    <Formik
      validationSchema={yup.object().shape({
        weather: yup.object().shape({
          location: yup.string().required().max(128),
          units: yup.string().required(),
        }),
      })}
      onSubmit={(e) => {
        // save changes
        // close modal
        updateSettings(e);
        closeModal();
      }}
      initialValues={{
        // use reducer state here later
        ...iValue,
        ...reject(equals(''))(initialSettings as any),
      }}
    >
      {(formik) => {
        return (
          <Form>
            <TextInput label="City" name="weather.location" />
            <TextInput label="Units" name="weather.units" />

            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(SettingsWeather);
