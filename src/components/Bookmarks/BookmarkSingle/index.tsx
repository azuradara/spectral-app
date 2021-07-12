import React from 'react';
import { Favorite } from '#interfaces';
import { parse_url } from '#utils';
import { get_url_ico } from '#store/deeds/get_url_ico';
import PinnedIcon from '#components/Icons/PinnedIcon';
import BookmarkSingleMenu from '#components/Bookmarks/BookmarkSingle/BookmarkSingleMenu';

import { ContextMenuTrigger } from 'react-contextmenu';

type ComponentProps = {
  fav: Favorite;
};

const BookmarkSingle = (props: ComponentProps): React.ReactElement => {
  const { fav } = props;
  const redir = parse_url(fav.url)[1];
  const ctxId = `ctx_bk_${fav.id}`;

  return (
    <>
      <div
        onDragStart={(e) => {
          console.log('ae');
          e.dataTransfer.setData('fav', JSON.stringify(fav));
        }}
        style={{ userSelect: 'all' }}
      >
        <ContextMenuTrigger id={ctxId} holdToDisplay={-1}>
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
                  width: '18px',
                }}
              />
            )}
          </a>
        </ContextMenuTrigger>
      </div>

      <BookmarkSingleMenu id={ctxId} fav={fav} />
    </>
  );
};

export default BookmarkSingle;
