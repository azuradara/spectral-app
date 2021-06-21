import {
  // Categories
  FetchCategoriesDeed,
  AddCategoryDeed,
  PinCategoryDeed,
  DeleteCategoryDeed,
  UpdateCategoryDeed,

  // Favorites
  AddFavoriteDeed,
  DeleteFavoriteDeed,
  UpdateFavoriteDeed,

  // Notifications
  CreateNotificationDeed,
  ClearNotificationDeed,

  // User
  LoginUserDeed,
} from './';

export enum DeedTypes {
  // Categories
  fetchCategories = 'FETCH_CATEGORIES',
  fetchCategoriesSuccess = 'FETCH_CATEGORIES_SUCC',
  fetchCategoriesError = 'FETCH_CATEGORIES_ERR',
  addCategory = 'ADD_CATEGORY',
  pinCategory = 'PIN_CATEGORY',
  deleteCategory = 'DELETE_CATEGORY',
  updateCategory = 'UPDATE_CATEGORY',

  // Favorites
  addFavorite = 'ADD_FAVORITE',
  deleteFavorite = 'DELETE_FAVORITE',
  updateFavorite = 'UPDATE_FAVORITE',

  // Notifications
  createNotification = 'CREATE_NOTIFICATION',
  clearNotification = 'CLEAR_NOTIFICATION',

  // User
  loginUser = 'LOGIN_USER',
  loginUserSuccess = 'LOGIN_USER_SUCC',
  loginUserError = 'LOGIN_USER_ERR',
}

export type Deed =
  // Categories
  | FetchCategoriesDeed<any>
  | AddCategoryDeed
  | PinCategoryDeed
  | DeleteCategoryDeed
  | UpdateCategoryDeed
  // Favorite
  | AddFavoriteDeed
  | DeleteFavoriteDeed
  | UpdateFavoriteDeed
  // Notifications
  | CreateNotificationDeed
  | ClearNotificationDeed
  // User
  | LoginUserDeed<any>;
