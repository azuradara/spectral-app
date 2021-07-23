import {
  actionTypes,
  Action,
  AddFavoriteAction,
  AddCategoryaction,
  DeleteCategoryaction,
  UpdateCategoryaction,
} from '#store/actions';

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

const fetchCategories = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const fetchCategoriesSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: false,
    categories: action.payload,
  };
};

const addCategory = (state: State, action: AddCategoryaction): State => {
  return {
    ...state,
    categories: [
      ...state.categories,
      {
        ...action.payload,
        favorites: [],
      },
    ],
  };
};

const addFavorite = (state: State, action: AddFavoriteAction): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === action.payload.category_id
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
            ...action.payload,
          },
        ],
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

// const pinCategory = (state: State, action: PinCategoryaction): State => {
//   const tempCat = [...state.categories];
//   const catAffected = tempCat.find(
//     (category: Category) => category.id === action.payload.id
//   );

//   if (catAffected) {
//     catAffected.is_pinned = action.payload.is_pinned;
//   }

//   return {
//     ...state,
//     categories: tempCat,
//   };
// };

const deleteCategory = (state: State, action: DeleteCategoryaction): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === action.payload
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const updateCategory = (state: State, action: UpdateCategoryaction): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === action.payload.id
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      {
        ...action.payload,
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const deleteFavorite = (state: State, action: Action): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === action.payload.catId
  );

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, catIdx),
      {
        ...state.categories[catIdx],
        favorites: [
          ...state.categories[catIdx].favorites.filter(
            (favorite: Favorite) => favorite.id !== action.payload.favId
          ),
        ],
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const updateFavorite = (state: State, action: Action): State => {
  const catIdx = state.categories.findIndex(
    (category: Category) => category.id === action.payload.category_id
  );
  const favIdx = state.categories[catIdx].favorites.findIndex(
    (favorite: Favorite) => favorite.id === action.payload.id
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
            ...action.payload,
          },
          ...state.categories[catIdx].favorites.slice(favIdx + 1),
        ],
      },
      ...state.categories.slice(catIdx + 1),
    ],
  };
};

const fetchPinnedFavorites = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const fetchPinnedFavoritesSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: false,
    pinnedFavorites: action.payload,
  };
};

// implement error case

const favoriteReducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case actionTypes.fetchCategories:
      return fetchCategories(state, action);

    case actionTypes.fetchCategoriesSuccess:
      return fetchCategoriesSuccess(state, action);

    case actionTypes.addCategory:
      return addCategory(state, action);

    case actionTypes.deleteCategory:
      return deleteCategory(state, action);

    // case actionTypes.pinCategory:
    //   return pinCategory(state, action);

    case actionTypes.updateCategory:
      return updateCategory(state, action);

    case actionTypes.addFavorite:
      return addFavorite(state, action);

    case actionTypes.updateFavorite:
      return updateFavorite(state, action);

    case actionTypes.deleteFavorite:
      return deleteFavorite(state, action);

    case actionTypes.fetchPinnedFavorites:
      return fetchPinnedFavorites(state, action);

    case actionTypes.fetchPinnedFavoritesSuccess:
      return fetchPinnedFavoritesSuccess(state, action);

    default:
      return state;
  }
};

export default favoriteReducer;
