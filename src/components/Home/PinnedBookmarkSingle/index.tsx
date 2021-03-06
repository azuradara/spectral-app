import React from 'react';
import { Favorite } from '#interfaces';
import { parse_url } from '#utils';
import { get_url_ico } from '#store/actions/get_url_ico';

import { ContextMenuTrigger } from 'react-contextmenu';
import PinnedBookmarkSingleMenu from '#components/Home/PinnedBookmarkSingle/PinnedBookmarkSingleMenu';

type ComponentProps = {
  fav: Favorite;
};

const PinnedBookmarkSingle = (props: ComponentProps): React.ReactElement => {
  const { fav } = props;
  const redir = parse_url(fav.url)[1];
  const ctxId = `ctx_bk_pinned_${fav.id}`;

  return (
    <>
      <ContextMenuTrigger id={ctxId}>
        <a
          className="bookmark"
          key={`bm_${fav.id}`}
          rel="noreferrer"
          href={redir}
        >
          <div className="bookmark__img">
            <img src={get_url_ico(fav.url)} alt={fav.title} />
          </div>
          <p>{fav.title}</p>
        </a>
      </ContextMenuTrigger>

      <PinnedBookmarkSingleMenu id={ctxId} fav={fav} />
    </>
  );
};

export default PinnedBookmarkSingle;
