import {
  DeedTypes,
  Deed,
  AddFavoriteDeed,
  AddCategoryDeed,
  PinCategoryDeed,
  DeleteCategoryDeed,
  UpdateCategoryDeed,
  DeleteFavoriteDeed,
  UpdateFavoriteDeed,
} from '../deeds';

import { Category, Favorite } from '../../lib/interfaces';

export interface State {
  seeking: boolean;
  err: string | undefined;
  categories: Category[];
}

const initState: State = {
  seeking: true,
  err: undefined,
  categories: [],
};

const fetchCategories = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const fetchCategoriesSuccess = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: false,
    categories: deed.payload,
  };
};

const addCategory = (state: State, deed: AddCategoryDeed): State => {
  return {
    ...state,
    categories: [
      ...state.categories,
      {
        ...deed.payload,
        favorites: [],
      },
    ],
  };
};

const addFavorite = (state: State, deed: AddFavoriteDeed): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === deed.payload.category_id
  );
  // dont look

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      {
        ...state.categories[catIdx],
        favorites: [
          ...state.categories[catIdx].favorites,
          {
            ...deed.payload,
          },
        ],
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const pinCategory = (state: State, deed: PinCategoryDeed): State => {
  const tempCat = [...state.categories];
  const catAffected = tempCat.find(
    (category: Category) => category.id === deed.payload.id
  );

  if (catAffected) {
    catAffected.is_pinned = deed.payload.is_pinned;
  }

  return {
    ...state,
    categories: tempCat,
  };
};

const deleteCategory = (state: State, deed: DeleteCategoryDeed): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === deed.payload
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const updateCategory = (state: State, deed: UpdateCategoryDeed): State => {
  const tempCat = [...state.categories];
  const catAffected = tempCat.find(
    (category: Category) => category.id === deed.payload.id
  );

  if (catAffected) {
    catAffected.name = deed.payload.name;
  }

  return {
    ...state,
    categories: tempCat,
  };
};

const deleteFavorite = (state: State, deed: DeleteFavoriteDeed): State => {
  const tempCat = [...state.categories];
  const affectedCat = tempCat.find(
    (category: Category) => category.id === deed.payload.catId
  );

  if (affectedCat) {
    affectedCat.favorites = affectedCat.favorites.filter(
      (favorite: Favorite) => favorite.id !== deed.payload.favId
    );
  }

  return {
    ...state,
    categories: tempCat,
  };
};

const updateFavorite = (state: State, deed: UpdateFavoriteDeed): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === deed.payload.category_id
  );
  const favIdx = state.categories[catIdx].favorites.findIndex(
    (favorite: Favorite) => favorite.id === deed.payload.id
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      {
        ...state.categories[catIdx],
        favorites: [
          ...state.categories[catIdx].favorites.slice(0, favIdx),
          {
            ...deed.payload,
          },
          ...state.categories[catIdx].favorites.slice(favIdx + 1),
        ],
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const favoriteReducer = (state: State = initState, deed: Deed): State => {
  switch (deed.type) {
    case DeedTypes.fetchCategories:
      return fetchCategories(state, deed);

    case DeedTypes.fetchCategoriesSuccess:
      return fetchCategoriesSuccess(state, deed);

    case DeedTypes.addCategory:
      return addCategory(state, deed);

    case DeedTypes.deleteCategory:
      return deleteCategory(state, deed);

    case DeedTypes.pinCategory:
      return pinCategory(state, deed);

    case DeedTypes.updateCategory:
      return updateCategory(state, deed);

    case DeedTypes.addFavorite:
      return addFavorite(state, deed);

    case DeedTypes.updateFavorite:
      return updateFavorite(state, deed);

    case DeedTypes.deleteFavorite:
      return deleteFavorite(state, deed);

    default:
      return state;
  }
};

export default favoriteReducer;
