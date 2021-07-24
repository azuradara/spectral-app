import React from 'react';
import { closeModal, deleteTaskCategory } from '#store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { TaskCategory } from '#interfaces';

const connector = connect(null, { closeModal, deleteTaskCategory });

type DeleteCategoryModalProps = {
  category: TaskCategory;
} & ConnectedProps<typeof connector>;

const DeleteCategoryModal = (
  props: DeleteCategoryModalProps
): React.ReactElement => {
  const { closeModal, deleteTaskCategory, category } = props;

  return (
    <div className="form-control">
      <div className="form-control__question">
        Are you sure you want to delete {category.name}?
      </div>
      <div className="form-control__warning">
        This will delete every task associated with it.
      </div>
      <button
        className="btn btn-btn btn-default"
        onClick={(e) => {
          deleteTaskCategory(category.id);
          closeModal();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default connector(DeleteCategoryModal);
