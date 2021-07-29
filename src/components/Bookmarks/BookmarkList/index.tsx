import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { connect, ConnectedProps } from 'react-redux';
import { Category, Favorite } from '#interfaces';
import { updateFavorite } from '#store/actions';

import { motion } from 'framer-motion';

import BookmarkSingle from '#components/Bookmarks/BookmarkSingle';
import BookmarkListMenu from '#components/Bookmarks/BookmarkList/BookmarkListMenu';

const connector = connect(null, { updateFavorite });

type ComponentProps = {
  category: Category;
} & ConnectedProps<typeof connector>;

const BookmarkList = (props: ComponentProps): React.ReactElement => {
  const { category, updateFavorite } = props;
  const ctxId = `ctx_cat_${category.id}`;

  const motionVariants = {
    hidden: {
      translateY: -10,
      opacity: 0,
    },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <>
      {' '}
      <ContextMenuTrigger id={ctxId} holdToDisplay={-1}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motionVariants}
          className="bookmarks-list"
          onDrop={(e) => {
            e.preventDefault();

            const fav: Favorite = JSON.parse(e.dataTransfer.getData('fav'));

            // if (fav.category_id === category.id) return;

            const prevCat = fav.category_id;

            fav.category_id = category.id;

            updateFavorite(fav.id, fav, prevCat);
          }}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <h3 className="bookmarks-list__title">{category.name}</h3>
          <div className="bookmarks-list__content">
            {category.favorites.map((fav: Favorite) => (
              <BookmarkSingle fav={fav} key={fav.id} />
            ))}
          </div>
        </motion.div>
      </ContextMenuTrigger>
      <BookmarkListMenu id={ctxId} category={category} />
    </>
  );
};

export default connector(BookmarkList);
