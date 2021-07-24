import { Formik, Form } from 'formik';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { TaskCategory } from '#interfaces';
import * as yup from 'yup';
import { reject, equals } from 'ramda';
import { TextInput, FormBtn, ColorInput } from '#components/FormElements';
import { closeModal, updateTaskCategory } from '#store/actions';

const connector = connect(null, { closeModal, updateTaskCategory });

type EditBookmarkModalProps = {
  category: TaskCategory;
} & ConnectedProps<typeof connector>;

const iValue = {
  name: '',
  color: '',
};

const EditTaskCategoryModal = (
  props: EditBookmarkModalProps
): React.ReactElement => {
  const { closeModal, category, updateTaskCategory } = props;
  return (
    <Formik
      validationSchema={yup.object().shape({
        name: yup.string().required().max(32),
        color: yup
          .string()
          .matches(/^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$/)
          .required(),
      })}
      onSubmit={(e) => {
        updateTaskCategory(
          category.id,
          (({ name, color }) => ({ name, color }))(e)
        );
        closeModal();
      }}
      initialValues={{
        ...iValue,
        ...reject(equals(''))(category as any),
      }}
    >
      {(formik) => {
        return (
          <Form>
            <TextInput name="name" label="Category Name" />
            <ColorInput name="color" label="Category Color" />
            <div className="form-control__submission">
              <FormBtn />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default connector(EditTaskCategoryModal);
