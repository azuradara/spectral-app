import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { ConnectedProps, connect } from 'react-redux';
import { closeModal, addTaskCategory } from '#store/actions';
import { ColorInput, FormBtn, TextInput } from '#components/FormElements';
import EditableInput from 'react-color/lib/components/common/EditableInput';
import { BlockPicker, MaterialPicker, SketchPicker } from 'react-color';
import toHex from 'colornames';

const connector = connect(null, { closeModal, addTaskCategory });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const iValue = {
  name: '',
  color: '#FFFFFF',
};

const AddTaskCategoryModal = (props: ComponentProps): React.ReactElement => {
  const { closeModal, addTaskCategory } = props;

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
        addTaskCategory((({ name, color }) => ({ name, color }))(e));
        closeModal();
      }}
      initialValues={iValue}
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

export default connector(AddTaskCategoryModal);
