import React from 'react';
import { deleteCategory, closeModal } from '#store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { Category } from '#interfaces';

const connector = connect(null, { closeModal, deleteCategory });

type DeleteCategoryModalProps = {
  category: Category;
} & ConnectedProps<typeof connector>;

const DeleteCategoryModal = (
  props: DeleteCategoryModalProps
): React.ReactElement => {
  const { closeModal, deleteCategory, category } = props;

  return (
    <div className="form-control">
      <div className="form-control__question">
        Are you sure you want to delete {category.name}?
      </div>
      <div className="form-control__warning">
        This will delete every bookmark that it contains!
      </div>
      <button
        className="btn btn-btn btn-default"
        onClick={(e) => {
          deleteCategory(category.id);
          closeModal();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default connector(DeleteCategoryModal);
