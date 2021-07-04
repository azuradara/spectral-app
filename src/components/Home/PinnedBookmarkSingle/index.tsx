import React from 'react';
import { Favorite } from '../../../lib/interfaces';
import { parse_url } from '../../../lib/util/parse_url';
import { get_url_ico } from '../../../store/deeds/get_url_ico';
import PinnedIcon from '../../../Icons/PinnedIcon';

import { ContextMenuTrigger } from 'react-contextmenu';
import PinnedBookmarkSingleMenu from './PinnedBookmarkSingleMenu';

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
