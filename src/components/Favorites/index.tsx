import React from 'react';
import { fetchCategories, logoutUser } from '../../store/deeds';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import FavoritegGrid from './FavoriteGrid';
import { Category, GlobalState } from '../../lib/interfaces';

interface ComponentProps {
  seeking: boolean;
  categories: Category[];
  fetchCategories: () => void;
  logoutUser: () => void;
}

export enum ContentType {
  category,
  favorite,
}

const Favorites = (props: ComponentProps): JSX.Element => {
  const { fetchCategories, categories, seeking, logoutUser } = props;

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories]);

  return (
    <div>
      {seeking ? <p>loading</p> : <FavoritegGrid categories={categories} />}
      <button onClick={async () => await logoutUser()}>ye</button>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.favorite.seeking,
    categories: state.favorite.categories,
  };
};

export default connect(mapStateToProps, { fetchCategories, logoutUser })(
  Favorites
);
