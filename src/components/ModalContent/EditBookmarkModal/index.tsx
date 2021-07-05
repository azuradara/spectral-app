import { Formik, Form } from 'formik';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Favorite } from '../../../lib/interfaces';
import * as yup from 'yup';
import { reject, equals } from 'ramda';
import { TextInput, FormBtn } from '../../FormElements';
import { closeModal } from '../../../store/deeds';

const connector = connect(null, { closeModal });

type EditBookmarkModalProps = {
  fav: Favorite;
} & ConnectedProps<typeof connector>;

const iValue = {
  title: '',
  url: '',
};

const EditBookmarkModal = (
  props: EditBookmarkModalProps
): React.ReactElement => {
  const { closeModal, fav } = props;
  return (
    <Formik
      validationSchema={yup.object().shape({
        title: yup.string().max(128),
        url: yup.string().url(),
      })}
      onSubmit={(e) => {
        // do stuff here
      }}
      initialValues={{
        ...iValue,
        ...reject(equals(''))(fav as any),
      }}
    >
      {(formik) => {
        return (
          <Form>
            <TextInput name="title" label="Bookmark Title" />
            <TextInput name="url" label="Bookmark URL" />
            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(EditBookmarkModal);
