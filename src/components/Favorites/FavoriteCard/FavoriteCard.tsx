import React from 'react';
import { Favorite, Category } from '../../../lib/interfaces';

interface ComponentProps {
  category: Category;
}

const FavoriteCard = (props: ComponentProps): JSX.Element => {
  return (
    <div>
      <h3>{props.category.name}</h3>
      <div>
        {props.category.favorites.map((fav: Favorite) => {
          const redir = 'https://youtube.com';

          <a href={redir} key={`fav_${fav.id}`}>
            {fav.title}
          </a>;
        })}
      </div>
    </div>
  );
};

export default FavoriteCard;
