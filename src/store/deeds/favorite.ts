import axios from 'axios';
import { Dispatch } from 'redux';
import { DeedTypes } from './deedTypes';
import { CreateNotificationDeed } from './notification';
import {
  Category,
  ApiResponse,
  NewCategory,
  Favorite,
  NewFavorite,
} from '../../lib/interfaces';

// FETCH CATEGORIES

export interface FetchCategoriesDeed<T> {
  type:
    | DeedTypes.fetchCategories
    | DeedTypes.fetchCategoriesSuccess
    | DeedTypes.fetchCategoriesError;
  payload: T;
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch<FetchCategoriesDeed<undefined>>({
    type: DeedTypes.fetchCategories,
    payload: undefined,
  });

  try {
    const res = await axios.get<ApiResponse<Category[]>>('/cat');

    console.log(res);

    dispatch<FetchCategoriesDeed<Category[]>>({
      type: DeedTypes.fetchCategoriesSuccess,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // improve upon error handling later | too lazy
  }
};

// ADD CATEGORY

export interface AddCategoryDeed {
  type: DeedTypes.addCategory;
  payload: Category;
}

export const addCategory =
  (formData: NewCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<ApiResponse<Category>>(
        'addcat endpoint',
        formData
      );

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `Category ${formData.name} created.`,
        },
      });

      dispatch<AddCategoryDeed>({
        type: DeedTypes.addCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// ADD FAVORITE

export interface AddFavoriteDeed {
  type: DeedTypes.addFavorite;
  payload: Favorite;
}

export const addFavorite =
  (formData: NewFavorite) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<ApiResponse<Favorite>>(
        'addfav endpoint',
        formData
      );
      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `Favorite ${formData.title} created`,
        },
      });

      dispatch<AddFavoriteDeed>({
        type: DeedTypes.addFavorite,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// PIN CATEGORY

// export interface PinCategoryDeed {
//   type: DeedTypes.pinCategory;
//   payload: Category;
// }

// export const pinCategory =
//   (category: Category) => async (dispatch: Dispatch) => {
//     try {
//       const { id, name } = category;
//       const res = await axios.put<ApiResponse<Category>>(
//         `updatecategory endpoint ${id}`,
//         { is_pinned: !is_pinned }
//       );

//       const msgSubstr = is_pinned ? 'unpinned cat' : 'pinned cat';

//       dispatch<CreateNotificationDeed>({
//         type: DeedTypes.createNotification,
//         payload: {
//           title: 'success',
//           message: `category ${name} ${msgSubstr}`,
//         },
//       });

//       dispatch<PinCategoryDeed>({
//         type: DeedTypes.pinCategory,
//         payload: res.data.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

// DELETE CATEGORY

export interface DeleteCategoryDeed {
  type: DeedTypes.deleteCategory;
  payload: number;
}

export const deleteCategory = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete<ApiResponse<Category>>(`deletecat endpoint ${id}`);

    dispatch<CreateNotificationDeed>({
      type: DeedTypes.createNotification,
      payload: {
        title: 'success',
        message: `category deleted`,
      },
    });

    dispatch<DeleteCategoryDeed>({
      type: DeedTypes.deleteCategory,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

// UPDATE CATEGORY

export interface UpdateCategoryDeed {
  type: DeedTypes.updateCategory;
  payload: Category;
}

export const updateCategory =
  (id: number, formData: NewCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.put<ApiResponse<Category>>(
        `updateCat endpoint ${id}`,
        formData
      );

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `Category ${formData.name} updated`,
        },
      });

      dispatch<UpdateCategoryDeed>({
        type: DeedTypes.updateCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// DELETE FAVORITE

export interface DeleteFavoriteDeed {
  type: DeedTypes.deleteFavorite;
  payload: {
    favId: number;
    catId: number;
  };
}

export const deleteFavorite =
  (favId: number, catId: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete<ApiResponse<unknown>>(`deletefav endpoint ${favId}`);

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `favorite deleted`,
        },
      });

      dispatch<DeleteFavoriteDeed>({
        type: DeedTypes.deleteFavorite,
        payload: {
          favId,
          catId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

// UPDATE FAVORITE

export interface UpdateFavoriteDeed {
  type: DeedTypes.updateFavorite;
  payload: Favorite;
}

export const updateFavorite =
  (favId: number, formData: NewFavorite, prevCatId: number) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.put<ApiResponse<Favorite>>(
        `updatefav endpoint ${favId}`,
        formData
      );

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `Favorite ${formData.title} updated`,
        },
      });

      const catChanged = formData.category_id !== prevCatId;

      if (catChanged) {
        dispatch<DeleteFavoriteDeed>({
          type: DeedTypes.deleteFavorite,
          payload: {
            favId,
            catId: prevCatId,
          },
        });

        dispatch<AddFavoriteDeed>({
          type: DeedTypes.addFavorite,
          payload: res.data.data,
        });
      } else {
        dispatch<UpdateFavoriteDeed>({
          type: DeedTypes.updateFavorite,
          payload: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

export interface FetchPinnedFavoritesDeed<T> {
  type:
    | DeedTypes.fetchPinnedFavorites
    | DeedTypes.fetchPinnedFavoritesSuccess
    | DeedTypes.fetchPinnedFavoritesError;
  payload: T;
}

export const fetchPinnedFavorites = () => async (dispatch: Dispatch) => {
  dispatch<FetchPinnedFavoritesDeed<undefined>>({
    type: DeedTypes.fetchPinnedFavorites,
    payload: undefined,
  });

  try {
    const res = await axios.get<ApiResponse<Favorite[]>>('/fav/pinned');

    dispatch<FetchPinnedFavoritesDeed<Favorite[]>>({
      type: DeedTypes.fetchPinnedFavoritesSuccess,
      payload: res.data.data,
    });
  } catch (e) {
    // ye
    console.log(e);
  }
};
