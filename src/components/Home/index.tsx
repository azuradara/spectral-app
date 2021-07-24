/* eslint-disable react/prop-types */
import React from 'react';
import { fetchPinnedFavorites } from '#store/actions';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import Clock from '#components/Home/Clock';
import SeekBar from '#components/shared/Seek';
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
    <div className="nexus">
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
    </div>
  );
};

export default connector(Home);
