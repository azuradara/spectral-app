import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { connect, ConnectedProps } from 'react-redux';
import PinnedIcon from '../../../../Icons/PinnedIcon';
import SettingsIcon from '../../../../Icons/SettingsIcon';
import TrashIcon from '../../../../Icons/TrashIcon';
import { Favorite } from '../../../../lib/interfaces';
import {
  deleteFavorite,
  updateFavorite,
  pinFavorite,
  openModal,
} from '../../../../store/deeds';
import EditBookmarkModal from '../../../ModalContent/EditBookmarkModal';

const connector = connect(null, {
  deleteFavorite,
  updateFavorite,
  pinFavorite,
  openModal,
});

type ComponentProps = {
  id: string;
  fav: Favorite;
} & ConnectedProps<typeof connector>;

const BookmarkSingleMenu = (props: ComponentProps): React.ReactElement => {
  const { id, fav, deleteFavorite, pinFavorite, openModal } = props;

  return (
    <ContextMenu id={id}>
      <MenuItem onClick={() => deleteFavorite(fav.id, fav.category_id)}>
        <TrashIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Delete
      </MenuItem>

      <MenuItem onClick={() => pinFavorite(fav)}>
        <PinnedIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        {fav.is_pinned ? 'Unpin' : 'Pin'}
      </MenuItem>

      <MenuItem
        onClick={() =>
          openModal({
            title: 'Edit Bookmark',
            content: <EditBookmarkModal fav={fav} />,
          })
        }
      >
        <SettingsIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Edit
      </MenuItem>
    </ContextMenu>
  );
};

export default connector(BookmarkSingleMenu);