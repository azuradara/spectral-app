import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { connect, ConnectedProps } from 'react-redux';
import PinnedIcon from '#components/shared/Icons/PinnedIcon';
import SettingsIcon from '#components/shared/Icons/SettingsIcon';
import TrashIcon from '#components/shared/Icons/TrashIcon';
import { Favorite } from '#interfaces';
import {
  deleteFavorite,
  updateFavorite,
  pinFavorite,
  openModal,
} from '#store/actions';
import EditBookmarkModal from '#components/ModalContent/EditBookmarkModal';

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

const PinnedBookmarkSingleMenu = (
  props: ComponentProps
): React.ReactElement => {
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
        Unpin
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

export default connector(PinnedBookmarkSingleMenu);
