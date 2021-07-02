import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import PinnedIcon from '../../../Icons/PinnedIcon';
import { Category, Favorite } from '../../../lib/interfaces';
import { parse_url } from '../../../lib/util/parse_url';
import { get_url_ico } from '../../../store/deeds/get_url_ico';

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
        {category.favorites.map((fav: Favorite) => {
          const redir = parse_url(fav.url)[1];

          return (
            <a
              className="bookmarks-list__favorite"
              key={`bm_${fav.id}`}
              rel="noreferrer"
              href={redir}
            >
              <div className="bookmarks-list__favorite__img">
                <img src={get_url_ico(fav.url)} alt={fav.title} />
              </div>
              <p>{fav.title}</p>
              {Boolean(fav.is_pinned) && (
                <PinnedIcon
                  style={{
                    opacity: 0.3,
                    transform: 'rotate(45deg) scale(0.8)',
                  }}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default connector(BookmarkList);
