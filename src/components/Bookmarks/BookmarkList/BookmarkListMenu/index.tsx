import { connect, ConnectedProps } from 'react-redux';
import * as React from 'react';
import { Category } from '$interfaces';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import AddIcon from '../../../../Icons/AddIcon';
import { openModal } from '../../../../store/deeds';
import EditCategoryModal from '../../../ModalContent/EditCategoryModal';
import SettingsIcon from '../../../../Icons/SettingsIcon';
import AddBookmarkModal from '../../../ModalContent/AddBookmarkModal';
import TrashIcon from '../../../../Icons/TrashIcon';
import DeleteCategoryModal from '../../../ModalContent/DeleteCategoryModal';

const connector = connect(null, { openModal });

type ComponentProps = {
  id: string;
  category: Category;
} & ConnectedProps<typeof connector>;

const BookmarkListMenu = (props: ComponentProps): React.ReactElement => {
  const { id, category, openModal } = props;

  return (
    <ContextMenu id={id}>
      <MenuItem
        onClick={() =>
          openModal({
            title: 'Edit Category',
            content: <EditCategoryModal cat={category} />,
          })
        }
      >
        <SettingsIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Edit category
      </MenuItem>

      <MenuItem
        onClick={() =>
          openModal({
            title: 'Add Favorite',
            content: <AddBookmarkModal category_id={category.id} />,
          })
        }
      >
        <AddIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Add bookmark
      </MenuItem>

      <MenuItem
        onClick={() =>
          openModal({
            title: 'Delete Category',
            content: <DeleteCategoryModal category={category} />,
          })
        }
      >
        <TrashIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Delete category
      </MenuItem>
    </ContextMenu>
  );
};

export default connector(BookmarkListMenu);
