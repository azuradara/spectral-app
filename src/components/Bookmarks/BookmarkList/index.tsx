import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Category, Favorite } from '../../../lib/interfaces';

import BookmarkSingle from '../BookmarkSingle';

const connector = connect(null, {});

type ComponentProps = {
  category: Category;
} & ConnectedProps<typeof connector>;

const BookmarkList = (props: ComponentProps): React.ReactElement => {
  const { category } = props;
  return (
    <div className="bookmarks-list">
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
