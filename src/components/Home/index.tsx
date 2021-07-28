/* eslint-disable react/prop-types */
import React from 'react';
import { fetchCategories, fetchPinnedFavorites } from '#store/actions';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import Clock from '#components/Home/Clock';
import SeekBar from '#components/shared/Seek';
import { motion } from 'framer-motion';
import PinnedBookmarkSingle from '#components/Home/PinnedBookmarkSingle';
import { selectPinnedBookmarks } from '#store/selectors/bookmarks';

const mapStateToProps = (state: GlobalState) => {
  return {
    seeking: state.favorite.seeking,
    pins: () => selectPinnedBookmarks(state),
  };
};

const connector = connect(mapStateToProps, {
  fetchCategories,
});

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

export enum ContentType {
  category,
  favorite,
}

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

const Home = (props: ComponentProps): JSX.Element => {
  const { seeking, pins, fetchCategories } = props;

  const allPins = pins();

  useEffect(() => {
    if (pins().length === 0) fetchCategories();
  }, [fetchCategories]);

  const loadingElement: JSX.Element = (
    <div className="nexus__bookmarks--loading">Loading..</div>
  );

  const noFavElement: JSX.Element = (
    <div className="nexus__bookmarks--nopins">{''}</div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants}
      className="nexus"
    >
      <div className="seek">
        <div className="seek-header">
          <Clock />
        </div>
        <SeekBar />
      </div>
      <div className="nexus__bookmarks">
        {seeking
          ? loadingElement
          : !allPins.length
          ? noFavElement
          : allPins.map((pin) => (
              <PinnedBookmarkSingle key={pin.id} fav={pin} />
            ))}
      </div>
    </motion.div>
  );
};

export default connector(Home);
