import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Category, GlobalState } from '../../../lib/interfaces';
import BookmarkList from '../BookmarkList';
import { fetchCategories } from '../../../store/deeds';
import Masonry from 'react-masonry-css';

const mapStatetoProps = (state: GlobalState) => {
  return {
    categories: state.favorite.categories,
    seeking: state.favorite.seeking,
    columns: state.settings.settings.bookmarks.category_columns,
  };
};

const connector = connect(mapStatetoProps, { fetchCategories });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const BookmarksGrid = (props: ComponentProps): React.ReactElement => {
  const { columns } = props;

  React.useEffect(() => {
    if (props.categories.length === 0) props.fetchCategories();
  }, [props.fetchCategories]);

  if (props.categories.length === 0) return <p>no bookmarks</p>;

  return (
    <Masonry
      className="bookmarks-grid"
      breakpointCols={columns}
      columnClassName="bookmarks-grid__category"
    >
      {props.categories.map(
        (cat: Category): React.ReactElement => (
          <BookmarkList category={cat} key={cat.id} />
        )
      )}
    </Masonry>
  );
};

export default connector(BookmarksGrid);
