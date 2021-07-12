import { Formik, Form } from 'formik';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Favorite } from '#interfaces';
import * as yup from 'yup';
import { reject, equals } from 'ramda';
import { TextInput, FormBtn } from '#components/FormElements';
import { closeModal, updateFavorite } from '#store/deeds';

const connector = connect(null, { closeModal, updateFavorite });

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
  const { closeModal, updateFavorite, fav } = props;
  return (
    <Formik
      validationSchema={yup.object().shape({
        title: yup.string().max(128),
        url: yup.string().url(),
      })}
      onSubmit={(e) => {
        const updatedFav: any = (({ title, url }) => ({ title, url }))(e);
        updatedFav.category_id = fav.category_id;

        updateFavorite(fav.id, updatedFav, fav.category_id);
        closeModal();
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
