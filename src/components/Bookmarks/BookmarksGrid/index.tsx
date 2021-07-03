import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Category, GlobalState } from '../../../lib/interfaces';
import BookmarkList from '../BookmarkList';
import { fetchCategories } from '../../../store/deeds';

const mapStatetoProps = (state: GlobalState) => {
  return {
    categories: state.favorite.categories,
    seeking: state.favorite.seeking,
  };
};

const connector = connect(mapStatetoProps, { fetchCategories });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const BookmarksGrid = (props: ComponentProps): React.ReactElement => {
  React.useEffect(() => {
    if (props.categories.length === 0) props.fetchCategories();
  }, [props.fetchCategories]);

  if (props.categories.length === 0) return <p>no bookmarks</p>;

  return (
    <div className="bookmarks-grid">
      {props.categories.map(
        (cat: Category): React.ReactElement => (
          <BookmarkList category={cat} key={cat.id} />
        )
      )}
    </div>
  );
};

export default connector(BookmarksGrid);
