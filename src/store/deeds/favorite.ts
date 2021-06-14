import axios from 'axios';
import { Dispatch } from 'redux';
import { DeedTypes } from './deedTypes';
import { CreateNotificationAction } from './notification';
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
    const res = await axios.get<ApiResponse<Category[]>>('API ENDPOINT HERE');

    dispatch<FetchCategoriesDeed<Category[]>>({
      type: DeedTypes.fetchCategoriesSuccess,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);

    // improve upon error handling later | too lazy
  }
};
