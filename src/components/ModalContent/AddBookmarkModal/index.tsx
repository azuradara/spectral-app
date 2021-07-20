import { Formik, Form } from 'formik';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import * as yup from 'yup';
import { TextInput, FormBtn } from '#components/FormElements';
import { addFavorite, closeModal } from '#store/actions';

const connector = connect(null, { closeModal, addFavorite });

type AddBookmarkModalProps = {
  category_id: string | number;
} & ConnectedProps<typeof connector>;

const iValue = {
  category_id: '',
  title: '',
  url: '',
};

const AddBookmarkModal = (props: AddBookmarkModalProps): React.ReactElement => {
  const { closeModal, addFavorite, category_id } = props;
  return (
    <Formik
      validationSchema={yup.object().shape({
        title: yup.string().max(128),
        url: yup.string().url(),
      })}
      onSubmit={(e) => {
        const nuFav: any = (({ title, url }) => ({ title, url }))(e);
        nuFav.category_id = category_id;

        addFavorite(nuFav);
        closeModal();
      }}
      initialValues={{
        ...iValue,
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

export default connector(AddBookmarkModal);
