import React from 'react';
import BookmarksGrid from './BookmarksGrid';
import SeekBar from '../Seek';

const Bookmarks = (): React.ReactElement => {
  return (
    <div>
      <div className="seek seek--not-home">
        <SeekBar />
      </div>
      <BookmarksGrid />
    </div>
  );
};

export default Bookmarks;
