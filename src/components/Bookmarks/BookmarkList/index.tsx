import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Category, Favorite, NewFavorite } from '../../../lib/interfaces';
import { updateFavorite } from '../../../store/deeds';

import BookmarkSingle from '../BookmarkSingle';

const connector = connect(null, { updateFavorite });

type ComponentProps = {
  category: Category;
} & ConnectedProps<typeof connector>;

const BookmarkList = (props: ComponentProps): React.ReactElement => {
  const { category, updateFavorite } = props;

  return (
    <div
      className="bookmarks-list"
      onDrop={(e) => {
        e.preventDefault();

        const fav: Favorite = JSON.parse(e.dataTransfer.getData('fav'));

        if (fav.category_id === category.id) return;

        const prevCat = fav.category_id;

        fav.category_id = category.id;

        updateFavorite(fav.id, fav, prevCat);
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <h3 className="bookmarks-list__title">{category.name}</h3>
      <div className="bookmarks-list__content">
        {category.favorites.map((fav: Favorite) => (
          <BookmarkSingle fav={fav} key={fav.id} />
        ))}
      </div>
    </div>
  );
};

export default connector(BookmarkList);
