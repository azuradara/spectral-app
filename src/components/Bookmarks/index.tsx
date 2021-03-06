import React from 'react';

import BookmarksGrid from '#components/Bookmarks/BookmarksGrid';
import SeekBar from '#components/shared/Seek';
import { ContextMenuTrigger } from 'react-contextmenu';
import { generate_id } from '#utils';
import CtxMenu from '#components/Bookmarks/CtxMenu';

const Bookmarks = (): React.ReactElement => {
  const ctxId = `ctx_bkpage_${generate_id()}`;
  return (
    <>
      <div className="bookmarks">
        <div className="seek seek--not-home">
          <SeekBar />
        </div>
        <ContextMenuTrigger id={ctxId} holdToDisplay={-1}>
          <BookmarksGrid />
        </ContextMenuTrigger>
      </div>

      <CtxMenu id={ctxId} />
    </>
  );
};

export default Bookmarks;
