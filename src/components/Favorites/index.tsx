/* eslint-disable react/prop-types */
import React from 'react';
import { fetchCategories, openModal } from '../../store/deeds';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FavoritegGrid from './FavoriteGrid';
import { GlobalState } from '../../lib/interfaces';
import Clock from '../Clock';
import SeekBar from '../Seek';
import Modal from '../Modal';

const mapStateToProps = (state: GlobalState) => {
  return {
    seeking: state.favorite.seeking,
    categories: state.favorite.categories,
  };
};

const connector = connect(mapStateToProps, { fetchCategories, openModal });

type ComponentProps = Record<string, undefined> &
  ConnectedProps<typeof connector>;

export enum ContentType {
  category,
  favorite,
}

const Favorites = (props: ComponentProps): JSX.Element => {
  const { fetchCategories, categories, seeking, openModal } = props;

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories]);

  return (
    <div className="nexus">
      <Modal />
      <div className="seek">
        <div className="seek-header">
          <Clock />
        </div>
        <SeekBar />
      </div>
      {seeking ? <p>loading</p> : <FavoritegGrid categories={categories} />}
      <button
        onClick={() => openModal({ title: 'seek', content: <SeekBar /> })}
      >
        ye
      </button>
    </div>
  );
};

export default connector(Favorites);
