import {
  DeedTypes,
  Deed,
  AddFavoriteDeed,
  AddCategoryDeed,
  DeleteCategoryDeed,
  UpdateCategoryDeed,
} from '#store/deeds';

import { Category, Favorite } from '#interfaces';

export interface State {
  seeking: boolean;
  err: string | undefined;
  categories: Category[];
  pinnedFavorites: Favorite[];
}

const initState: State = {
  seeking: true,
  err: undefined,
  categories: [],
  pinnedFavorites: [],
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

// const pinCategory = (state: State, deed: PinCategoryDeed): State => {
//   const tempCat = [...state.categories];
//   const catAffected = tempCat.find(
//     (category: Category) => category.id === deed.payload.id
//   );

//   if (catAffected) {
//     catAffected.is_pinned = deed.payload.is_pinned;
//   }

//   return {
//     ...state,
//     categories: tempCat,
//   };
// };

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
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === deed.payload.id
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      {
        ...deed.payload,
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const deleteFavorite = (state: State, deed: Deed): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === deed.payload.catId
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      {
        ...state.categories[catIdx],
        favorites: [
          ...state.categories[catIdx].favorites.filter(
            (favorite: Favorite) => favorite.id !== deed.payload.favId
          ),
        ],
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const updateFavorite = (state: State, deed: Deed): State => {
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

const fetchPinnedFavorites = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const fetchPinnedFavoritesSuccess = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: false,
    pinnedFavorites: deed.payload,
  };
};

// implement error case

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

    // case DeedTypes.pinCategory:
    //   return pinCategory(state, deed);

    case DeedTypes.updateCategory:
      return updateCategory(state, deed);

    case DeedTypes.addFavorite:
      return addFavorite(state, deed);

    case DeedTypes.updateFavorite:
      return updateFavorite(state, deed);

    case DeedTypes.deleteFavorite:
      return deleteFavorite(state, deed);

    case DeedTypes.fetchPinnedFavorites:
      return fetchPinnedFavorites(state, deed);

    case DeedTypes.fetchPinnedFavoritesSuccess:
      return fetchPinnedFavoritesSuccess(state, deed);

    default:
      return state;
  }
};

export default favoriteReducer;
