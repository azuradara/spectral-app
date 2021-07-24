import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Category, GlobalState } from '#interfaces';
import BookmarkList from '#components/Bookmarks/BookmarkList';
import { fetchCategories } from '#store/actions';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

const mapStatetoProps = (state: GlobalState) => {
  return {
    categories: state.favorite.categories,
    seeking: state.favorite.seeking,
    columns: state.settings.settings.bookmarks?.category_columns,
  };
};

const connector = connect(mapStatetoProps, { fetchCategories });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const motionVariants = {
  hidden: {
    translateY: -20,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const BookmarksGrid = (props: ComponentProps): React.ReactElement => {
  const { columns } = props;

  React.useEffect(() => {
    if (props.categories.length === 0) props.fetchCategories();
  }, [props.fetchCategories]);

  return (
    <Masonry
      className="bookmarks-grid"
      breakpointCols={columns}
      columnClassName="bookmarks-grid__category"
    >
      {props.categories.length ? (
        props.categories.map(
          (cat: Category): React.ReactElement => (
            <BookmarkList category={cat} key={cat.id} />
          )
        )
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motionVariants}
          className="bookmarks-grid__none"
        >
          <h2>You don't have any pinned bookmarks :(</h2>
          <p>Right click here to start.</p>
        </motion.div>
      )}
    </Masonry>
  );
};

export default connector(BookmarksGrid);
