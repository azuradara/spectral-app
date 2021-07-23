import axios from 'axios';
import { Dispatch } from 'redux';
import { actionTypes } from '.';
import { CreateNotificationaction } from '#store/actions';
import {
  Category,
  ApiResponse,
  NewCategory,
  Favorite,
  NewFavorite,
} from '#interfaces';

// FETCH CATEGORIES

export interface FetchCategoriesaction<T> {
  type:
    | actionTypes.fetchCategories
    | actionTypes.fetchCategoriesSuccess
    | actionTypes.fetchCategoriesError;
  payload: T;
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch<FetchCategoriesaction<undefined>>({
    type: actionTypes.fetchCategories,
    payload: undefined,
  });

  try {
    const res = await axios.get<ApiResponse<Category[]>>('/cat');

    dispatch<FetchCategoriesaction<Category[]>>({
      type: actionTypes.fetchCategoriesSuccess,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // improve upon error handling later | too lazy
  }
};

// ADD CATEGORY

export interface AddCategoryaction {
  type: actionTypes.addCategory;
  payload: Category;
}

export const addCategory =
  (formData: NewCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<ApiResponse<Category>>('/cat', formData);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'success',
          message: `Category ${formData.name} created.`,
          type: 'default',
        },
      });

      dispatch<AddCategoryaction>({
        type: actionTypes.addCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// ADD FAVORITE

export interface AddFavoriteAction {
  type: actionTypes.addFavorite;
  payload: Favorite;
}

export const addFavorite =
  (formData: NewFavorite) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<ApiResponse<Favorite>>('/fav', formData);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'success',
          message: `Bookmark ${formData.title} created`,
          type: 'default',
        },
      });

      dispatch<AddFavoriteAction>({
        type: actionTypes.addFavorite,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// PIN CATEGORY

// export interface PinCategoryaction {
//   type: actionTypes.pinCategory;
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

//       dispatch<CreateNotificationaction>({
//         type: actionTypes.createNotification,
//         payload: {
//           title: 'success',
//           message: `category ${name} ${msgSubstr}`,
//         },
//       });

//       dispatch<PinCategoryaction>({
//         type: actionTypes.pinCategory,
//         payload: res.data.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

// DELETE CATEGORY

export interface DeleteCategoryaction {
  type: actionTypes.deleteCategory;
  payload: number;
}

export const deleteCategory = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete<ApiResponse<Category>>(`/cat/${id}`);

    dispatch<CreateNotificationaction>({
      type: actionTypes.createNotification,
      payload: {
        title: 'success',
        message: `category deleted`,
        type: 'default',
      },
    });

    dispatch<DeleteCategoryaction>({
      type: actionTypes.deleteCategory,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

// UPDATE CATEGORY

export interface UpdateCategoryaction {
  type: actionTypes.updateCategory;
  payload: Category;
}

export const updateCategory =
  (id: number, formData: NewCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.put<ApiResponse<Category>>(
        `/cat/${id}`,
        formData
      );

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${formData.name} updated`,
          type: 'default',
        },
      });

      dispatch<UpdateCategoryaction>({
        type: actionTypes.updateCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// DELETE FAVORITE

export interface DeleteFavoriteaction {
  type: actionTypes.deleteFavorite;
  payload: {
    favId: number;
    catId: number;
  };
}

export const deleteFavorite =
  (favId: number, catId: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete<ApiResponse<unknown>>(`/fav/${favId}`);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'success',
          message: `favorite deleted`,
          type: 'default',
        },
      });

      dispatch<DeleteFavoriteaction>({
        type: actionTypes.deleteFavorite,
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

export interface UpdateFavoriteaction {
  type: actionTypes.updateFavorite;
  payload: Favorite;
}

export const updateFavorite =
  (favId: number, formData: NewFavorite, prevCatId: number) =>
  async (dispatch: Dispatch) => {
    try {
      const fav = (({ title, url, category_id }) => ({
        title,
        url,
        category_id,
      }))(formData);

      const res = await axios.put<ApiResponse<Favorite>>(`/fav/${favId}`, fav);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Updated',
          message: `Favorite ${formData.title} updated successfully.`,
          type: 'default',
        },
      });

      const catChanged = formData.category_id !== prevCatId;
      console.log(catChanged);

      dispatch<DeleteFavoriteaction>({
        type: actionTypes.deleteFavorite,
        payload: {
          favId,
          catId: prevCatId,
        },
      });

      if (catChanged) {
        dispatch<AddFavoriteAction>({
          type: actionTypes.addFavorite,
          payload: res.data.data,
        });
      } else {
        dispatch<UpdateFavoriteaction>({
          type: actionTypes.updateFavorite,
          payload: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

export interface PinFavoriteaction {
  type: actionTypes.pinFavorite;
  payload: Favorite;
}

export const pinFavorite =
  (favorite: Favorite) => async (dispatch: Dispatch) => {
    try {
      const { id, is_pinned } = favorite;
      const res = await axios.put<ApiResponse<Favorite>>(`fav/pin/${id}`, {
        is_pinned: !is_pinned,
      });

      const msgSubstr = !is_pinned ? 'Bookmark pinned.' : 'Bookmark unpinned.';

      // dispatch notification here

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Updated',
          message: msgSubstr,
          type: 'default',
        },
      });

      dispatch<UpdateFavoriteaction>({
        type: actionTypes.updateFavorite,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface FetchPinnedFavoritesaction<T> {
  type:
    | actionTypes.fetchPinnedFavorites
    | actionTypes.fetchPinnedFavoritesSuccess
    | actionTypes.fetchPinnedFavoritesError;
  payload: T;
}

export const fetchPinnedFavorites = () => async (dispatch: Dispatch) => {
  dispatch<FetchPinnedFavoritesaction<undefined>>({
    type: actionTypes.fetchPinnedFavorites,
    payload: undefined,
  });

  try {
    const res = await axios.get<ApiResponse<Favorite[]>>('/fav/pinned');

    dispatch<FetchPinnedFavoritesaction<Favorite[]>>({
      type: actionTypes.fetchPinnedFavoritesSuccess,
      payload: res.data.data,
    });
  } catch (e) {
    // ye
    console.log(e);
  }
};
