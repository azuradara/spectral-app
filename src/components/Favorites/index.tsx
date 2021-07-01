/* eslint-disable react/prop-types */
import React from 'react';
import { fetchCategories } from '../../store/deeds';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FavoritegGrid from './FavoriteGrid';
import { GlobalState } from '../../lib/interfaces';
import Clock from '../Clock';
import SeekBar from '../Seek';

const mapStateToProps = (state: GlobalState) => {
  return {
    seeking: state.favorite.seeking,
    categories: state.favorite.categories,
  };
};

const connector = connect(mapStateToProps, { fetchCategories });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

export enum ContentType {
  category,
  favorite,
}

const Favorites = (props: ComponentProps): JSX.Element => {
  const { fetchCategories, categories, seeking } = props;

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories]);

  return (
    <div className="nexus">
      <div className="seek">
        <div className="seek-header">
          <Clock />
        </div>
        <SeekBar />
      </div>
      {seeking ? <p>loading</p> : <FavoritegGrid categories={categories} />}
    </div>
  );
};

export default connector(Favorites);
