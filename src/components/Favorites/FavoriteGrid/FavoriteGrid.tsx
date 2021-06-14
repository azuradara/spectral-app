import React from 'react';
import { Category } from '../../../lib/interfaces';
import FavoriteCard from '../FavoriteCard/FavoriteCard';

interface ComponentProps {
  categories: Category[];
  categoryCount?: number;
}

const FavoriteGrid = (props: ComponentProps): JSX.Element => {
  let favorites: JSX.Element;

  if (props.categories.length > 0) {
    favorites = (
      <div>
        {props.categories.map(
          (category: Category): JSX.Element => (
            <FavoriteCard category={category} key={category.id} />
          )
        )}
      </div>
    );
  } else {
    if (props.categoryCount) {
      favorites = <p>no pinned cats</p>;
    } else {
      favorites = <p>no bookmarks</p>;
    }
  }

  return favorites;
};

export default FavoriteGrid;
