import * as React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { DropZoneInput, SliderInput } from '../../FormElements';
import { byte_size } from '../../../lib/util/byte_size';

const iValue = {
  bg: {
    url: '',
    opacity: 0,
    blur: 0,
  },
};

const SettingsModal: React.FC = () => {
  return (
    <Formik
      validationSchema={yup.object().shape({
        bg: yup.object().shape({
          url: yup
            .string()
            .test('len', 'Maximum file size is 8MB', (val = '') => {
              return byte_size(val) <= 8 * 1048576;
            }),
          opacity: yup.number().min(0).max(1),
          blur: yup.number().min(0).max(500),
        }),
      })}
      onSubmit={(e) => {
        // save changes
        // close modal
        return;
      }}
      initialValues={{
        // use reducer state here later
        ...iValue,
      }}
    >
      {(formik) => {
        return (
          <Form>
            <DropZoneInput
              name="bg.url"
              label="Drag a background image here, or click to browse."
            />

            <SliderInput
              name="bg.opacity"
              label="Overlay Opacity"
              max={1}
              min={0}
            />

            <SliderInput
              name="bg.blur"
              label="Overlay Blur"
              max={500}
              min={0}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SettingsModal;
