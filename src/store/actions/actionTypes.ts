import {
  // Categories
  FetchCategoriesaction,
  AddCategoryaction,
  // PinCategoryaction,
  DeleteCategoryaction,
  UpdateCategoryaction,

  // Favorites
  AddFavoriteaction,
  DeleteFavoriteaction,
  UpdateFavoriteaction,
  FetchPinnedFavoritesaction,

  // Notifications
  CreateNotificationaction,
  ClearNotificationaction,

  // User
  LoginUseraction,
  LogoutUseraction,

  // Modal
  OpenModalaction,
  CloseModalaction,

  // @TASKS - CATEGORIES
  FetchTaskCategoriesaction,
  AddTaskCategoryaction,
  DeleteTaskCategoryaction,
  UpdateTaskCategoryaction,

  // @TASKS - TASKS
  AddTaskaction,
  DeleteTaskaction,
  UpdateTaskaction,

  // Settings
  UpdateSettingsaction,
} from '#store/actions';

export enum actionTypes {
  // Categories
  fetchCategories = 'FETCH_CATEGORIES',
  fetchCategoriesSuccess = 'FETCH_CATEGORIES_SUCC',
  fetchCategoriesError = 'FETCH_CATEGORIES_ERR',
  addCategory = 'ADD_CATEGORY',
  // pinCategory = 'PIN_CATEGORY',
  deleteCategory = 'DELETE_CATEGORY',
  updateCategory = 'UPDATE_CATEGORY',

  // Favorites
  addFavorite = 'ADD_FAVORITE',
  deleteFavorite = 'DELETE_FAVORITE',
  updateFavorite = 'UPDATE_FAVORITE',
  pinFavorite = 'PIN_FAVORITE',
  fetchPinnedFavorites = 'FETCH_PINNED_FAVORITES',
  fetchPinnedFavoritesSuccess = 'FETCH_PINNED_FAVORITES_SUCC',
  fetchPinnedFavoritesError = 'FETCH_PINNED_FAVORITES_ERR',

  // Notifications
  createNotification = 'CREATE_NOTIFICATION',
  clearNotification = 'CLEAR_NOTIFICATION',

  // User
  loginUser = 'LOGIN_USER',
  loginUserSuccess = 'LOGIN_USER_SUCC',
  loginUserError = 'LOGIN_USER_ERR',
  logoutUser = 'LOGOUT_USER',

  // Modal
  openModal = '@modal/OPEN_MODAL',
  closeModal = '@modal/CLOSE_MODAL',

  // @TASKS - CATEGORIES
  fetchTaskCategories = '@tasks/FETCH_CATEGORIES',
  fetchTaskCategoriesSuccess = '@tasks/FETCH_CATEGORIES_SUCC',
  fetchTaskCategoriesError = '@tasks/FETCH_CATEGORIES_ERR',
  addTaskCategory = '@tasks/ADD_CATEGORY',
  deleteTaskCategory = '@tasks/DELETE_CATEGORY',
  updateTaskCategory = '@tasks/UPDATE_CATEGORY',

  // @TASKS - TASKS
  addTask = '@tasks/ADD_TASK',
  deleteTask = '@tasks/DELETE_TASK',
  updateTask = '@tasks/UPDATE_TASK',

  // Settings
  updateSettings = '@settings/UPDATE_SETTINGS',
}

export type action =
  // Categories
  | FetchCategoriesaction<any>
  | AddCategoryaction
  // | PinCategoryaction
  | DeleteCategoryaction
  | UpdateCategoryaction
  // Favorite
  | AddFavoriteaction
  | DeleteFavoriteaction
  | UpdateFavoriteaction
  | FetchPinnedFavoritesaction<any>
  // Notifications
  | CreateNotificationaction
  | ClearNotificationaction
  // User
  | LoginUseraction<any>
  | LogoutUseraction
  // Modal
  | OpenModalaction
  | CloseModalaction
  // @TASKS - CATEGORIES
  | FetchTaskCategoriesaction<any>
  | AddTaskCategoryaction
  | DeleteTaskCategoryaction
  | UpdateTaskCategoryaction
  // @TASKS
  | AddTaskaction
  | DeleteTaskaction
  | UpdateTaskaction
  //Settings
  | UpdateSettingsaction;
