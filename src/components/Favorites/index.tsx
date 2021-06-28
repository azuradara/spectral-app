import React from 'react';
import { fetchCategories, logoutUser } from '../../store/deeds';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import FavoritegGrid from './FavoriteGrid';
import { Category, GlobalState } from '../../lib/interfaces';
import Clock from '../Clock';
import SeekBar from '../Seek';

interface ComponentProps {
  seeking: boolean;
  categories: Category[];
  fetchCategories: () => void;
}

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

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.favorite.seeking,
    categories: state.favorite.categories,
  };
};

export default connect(mapStateToProps, { fetchCategories })(Favorites);
