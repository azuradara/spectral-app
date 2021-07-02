/* eslint-disable react/prop-types */
import React from 'react';
import { fetchPinnedFavorites } from '../../store/deeds';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '../../lib/interfaces';
import Clock from '../Clock';
import SeekBar from '../Seek';

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

const Favorites = (props: ComponentProps): JSX.Element => {
  const { seeking, pins, fetchPinnedFavorites } = props;

  useEffect(() => {
    fetchPinnedFavorites();
  }, [fetchPinnedFavorites]);

  return (
    <div className="nexus">
      <div className="seek">
        <div className="seek-header">
          <Clock />
        </div>
        <SeekBar />
      </div>
      {seeking ? <p>loading</p> : 'fix this later'}
    </div>
  );
};

export default connector(Favorites);
