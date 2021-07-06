import React from 'react';
import BookmarksGrid from './BookmarksGrid';
import SeekBar from '../Seek';
import { ContextMenuTrigger } from 'react-contextmenu';
import concoct_id from '../../lib/helpers/concoct_id';
import CtxMenu from './CtxMenu';

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
