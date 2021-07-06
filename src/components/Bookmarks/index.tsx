import React from 'react';
import BookmarksGrid from './BookmarksGrid';
import SeekBar from '../Seek';
import { ContextMenuTrigger } from 'react-contextmenu';
import { addFavorite, addCategory } from '../../store/deeds';

const Bookmarks = (): React.ReactElement => {
  return (
    <div className="bookmarks">
      <div className="seek seek--not-home">
        <SeekBar />
      </div>
      <BookmarksGrid />
    </div>
  );
};

export default Bookmarks;
