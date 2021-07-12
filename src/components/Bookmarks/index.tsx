import React from 'react';
import BookmarksGrid from '#components/Bookmarks/BookmarksGrid';
import SeekBar from '#components/Seek';
import { ContextMenuTrigger } from 'react-contextmenu';
import concoct_id from '#lib/helpers/concoct_id';
import CtxMenu from '#components/Bookmarks/CtxMenu';

const Bookmarks = (): React.ReactElement => {
  const ctxId = `ctx_bkpage_${concoct_id()}`;
  return (
    <>
      <ContextMenuTrigger id={ctxId} holdToDisplay={-1}>
        <div className="bookmarks">
          <div className="seek seek--not-home">
            <SeekBar />
          </div>
          <BookmarksGrid />
        </div>
      </ContextMenuTrigger>

      <CtxMenu id={ctxId} />
    </>
  );
};

export default Bookmarks;
