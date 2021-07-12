import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { connect, ConnectedProps } from 'react-redux';
import PinnedIcon from '#components/Icons/PinnedIcon';
import SettingsIcon from '#components/Icons/SettingsIcon';
import TrashIcon from '#components/Icons/TrashIcon';
import { Favorite } from '#interfaces';
import { deleteFavorite, updateFavorite, pinFavorite } from '#store/deeds';

const connector = connect(null, {
  deleteFavorite,
  updateFavorite,
  pinFavorite,
});

type ComponentProps = {
  id: string;
  fav: Favorite;
} & ConnectedProps<typeof connector>;

const BookmarkSingleMenu = (props: ComponentProps): React.ReactElement => {
  const { id, fav, deleteFavorite, pinFavorite } = props;

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

      <MenuItem onClick={() => deleteFavorite(fav.id, fav.category_id)}>
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
