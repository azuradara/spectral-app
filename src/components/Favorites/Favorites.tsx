import React from 'react';
import { fetchCategories } from '../../store/deeds';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import FavoritegGrid from './FavoriteGrid/FavoriteGrid';
import { Category, GlobalState } from '../../lib/interfaces';

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
    <div>
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
