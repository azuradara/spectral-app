import * as React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { DropZoneInput, FormBtn, SliderInput } from '#components/FormElements';
import { byte_size } from '#utils';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import { updateSettings, closeModal } from '#store/deeds';
import { equals, reject } from 'ramda';

const iValue = {
  bg: {
    url: '',
    opacity: 0,
    blur: 0,
  },
  bookmarks: {
    category_columns: 0,
  },
};

const mapStateToProps = (state: GlobalState) => ({
  initialSettings: state.settings.settings,
});

const connector = connect(mapStateToProps, { updateSettings, closeModal });

type SettingsModalProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const SettingsModal = (props: SettingsModalProps): React.ReactElement => {
  const { updateSettings, initialSettings, closeModal } = props;

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
          blur: yup.number().min(0).max(50),
        }),
        bookmarks: yup.object().shape({
          category_columns: yup.number().min(1).max(5),
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
            <DropZoneInput
              name="bg.url"
              label="Drag a background image here, or click to browse."
            />

            <SliderInput
              name="bg.opacity"
              label="Overlay Opacity"
              max={1}
              min={0}
              step={0.01}
            />

            <SliderInput
              step={1}
              name="bg.blur"
              label="Overlay Blur"
              max={50}
              min={0}
            />

            <SliderInput
              name="bookmarks.category_columns"
              label="Category Columns"
              max={5}
              min={1}
              step={1}
            />
            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(SettingsModal);
