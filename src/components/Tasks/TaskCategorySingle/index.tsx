import React from 'react';
import { Favorite, TaskCategory } from '#interfaces';
import { parse_url } from '#utils';
import { get_url_ico } from '#store/actions/get_url_ico';
import PinnedIcon from '#components/shared/Icons/PinnedIcon';
import BookmarkSingleMenu from '#components/Bookmarks/BookmarkSingle/BookmarkSingleMenu';

import { ContextMenuTrigger } from 'react-contextmenu';

import { motion } from 'framer-motion';
import TaskCategorySingleMenu from './TaskCategorySingleMenu';

type ComponentProps = {
  category: TaskCategory;
};

const TaskCategorySingle = (props: ComponentProps): React.ReactElement => {
  const { category } = props;
  const ctxId = `ctx_tcat_${category.id}`;

  const motionVariants = {
    hidden: {
      translateX: 10,
      opacity: 0,
    },
    visible: {
      opacity: 1,
      translateX: 0,
      transition: {
        duration: 0.1,
        delay: 0.15,
      },
    },
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ContextMenuTrigger id={ctxId} holdToDisplay={-1}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={motionVariants}
            className="tab"
          >
            <div
              className="tab__color"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </motion.div>
        </ContextMenuTrigger>
      </div>
      <TaskCategorySingleMenu category={category} id={ctxId} />
    </>
  );
};

export default TaskCategorySingle;
