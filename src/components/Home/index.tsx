/* eslint-disable react/prop-types */
import React from 'react';
import { fetchPinnedFavorites } from '#store/actions';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import Clock from '#components/Home/Clock';
import SeekBar from '#components/shared/Seek';
import { motion } from 'framer-motion';
import PinnedBookmarkSingle from '#components/Home/PinnedBookmarkSingle';

const mapStateToProps = (state: GlobalState) => {
  return {
    seeking: state.favorite.seeking,
    pins: state.favorite.pinnedFavorites,
  };
};

const connector = connect(mapStateToProps, { fetchPinnedFavorites });

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
  const { seeking, pins, fetchPinnedFavorites } = props;

  useEffect(() => {
    fetchPinnedFavorites();
  }, [fetchPinnedFavorites]);

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
          : !pins.length
          ? noFavElement
          : pins.map((pin) => <PinnedBookmarkSingle key={pin.id} fav={pin} />)}
      </div>
    </motion.div>
  );
};

export default connector(Home);
