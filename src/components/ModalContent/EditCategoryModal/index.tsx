import * as React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Category } from '$interfaces';
import { closeModal, updateCategory } from '../../../store/deeds';
import * as yup from 'yup';
import { reject, equals } from 'ramda';
import { TextInput, FormBtn } from '../../FormElements';
import { Formik, Form } from 'formik';

const connector = connect(null, { closeModal, updateCategory });

type EditCategoryModalProps = {
  cat: Category;
} & ConnectedProps<typeof connector>;

const iValue = {
  name: '',
};

const EditCategoryModal = (
  props: EditCategoryModalProps
): React.ReactElement => {
  const { closeModal, updateCategory, cat } = props;

  return (
    <Formik
      validationSchema={yup.object().shape({
        name: yup.string().max(32),
      })}
      onSubmit={(e) => {
        updateCategory(cat.id, e);
        closeModal();
      }}
      initialValues={{
        ...iValue,
        ...reject(equals(''))(cat as any),
      }}
    >
      {(formik) => {
        return (
          <Form>
            <TextInput name="name" label="Category Name" />
            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(EditCategoryModal);
