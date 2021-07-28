import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { connect, ConnectedProps } from 'react-redux';
import SettingsIcon from '#components/shared/Icons/SettingsIcon';
import TrashIcon from '#components/shared/Icons/TrashIcon';
import { TaskCategory } from '#interfaces';
import {
  deleteFavorite,
  updateFavorite,
  pinFavorite,
  openModal,
} from '#store/actions';
import EditTaskCategoryModal from '#components/ModalContent/Tasks/EditTaskCategoryModal';
import DeleteTaskCategoryModal from '#components/ModalContent/Tasks/DeleteTaskCategoryModal';

const connector = connect(null, {
  deleteFavorite,
  updateFavorite,
  pinFavorite,
  openModal,
});

type ComponentProps = {
  id: string;
  category: TaskCategory;
} & ConnectedProps<typeof connector>;

const TaskCategorySingleMenu = (props: ComponentProps): React.ReactElement => {
  const { id, category, openModal } = props;

  return (
    <ContextMenu id={id}>
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          openModal({
            title: 'Edit Bookmark',
            content: <EditTaskCategoryModal category={category} />,
          });
        }}
      >
        <SettingsIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Edit
      </MenuItem>

      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          openModal({
            title: 'Delete Category',
            content: <DeleteTaskCategoryModal category={category} />,
          });
        }}
      >
        <TrashIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Delete
      </MenuItem>
    </ContextMenu>
  );
};

export default connector(TaskCategorySingleMenu);
