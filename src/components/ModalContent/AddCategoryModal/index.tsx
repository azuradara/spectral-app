import { Formik, Form } from 'formik';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import * as yup from 'yup';
import { TextInput, FormBtn } from '../../FormElements';
import { addCategory, closeModal } from '../../../store/deeds';
import { NewCategory } from '../../../lib/interfaces';

const connector = connect(null, { closeModal, addCategory });

type AddBookmarkModalProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const iValue = {
  name: '',
};

const AddCategoryModal = (props: AddBookmarkModalProps): React.ReactElement => {
  const { closeModal, addCategory } = props;
  return (
    <Formik
      validationSchema={yup.object().shape({
        name: yup.string().max(32),
      })}
      onSubmit={(e) => {
        const cat: NewCategory = (({ name }) => ({ name }))(e);

        addCategory(cat);
        closeModal();
      }}
      initialValues={{
        ...iValue,
      }}
    >
      {(formik) => {
        return (
          <Form>
            <TextInput name="name" label="Category Title" />
            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(AddCategoryModal);
