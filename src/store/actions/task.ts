import axios from 'axios';
import { actionTypes } from '#store/actions/actionTypes';
import { Dispatch } from 'redux';
import {
  TaskCategory,
  ApiResponse,
  NewTaskCategory,
  Task,
  NewTask,
} from '#interfaces';
import { CreateNotificationaction } from '#store/actions';

export interface FetchTaskCategoriesaction<T> {
  type:
    | actionTypes.fetchTaskCategories
    | actionTypes.fetchTaskCategoriesSuccess
    | actionTypes.fetchTaskCategoriesError;
  payload: T;
}

export const fetchTaskCategories = () => async (dispatch: Dispatch) => {
  dispatch<FetchTaskCategoriesaction<undefined>>({
    type: actionTypes.fetchTaskCategories,
    payload: undefined,
  });

  try {
    const res = await axios.get<ApiResponse<TaskCategory[]>>('/task_cat');

    dispatch<FetchTaskCategoriesaction<TaskCategory[]>>({
      type: actionTypes.fetchTaskCategoriesSuccess,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('err');
  }
};

export interface AddTaskCategoryaction {
  type: actionTypes.addTaskCategory;
  payload: TaskCategory;
}

export const addTaskCategory =
  (formData: NewTaskCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<ApiResponse<TaskCategory>>(
        '/task_cat',
        formData
      );

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'success',
          message: `Category ${formData.name} created.`,
          type: 'default',
        },
      });

      dispatch<AddTaskCategoryaction>({
        type: actionTypes.addTaskCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface DeleteTaskCategoryaction {
  type: actionTypes.deleteTaskCategory;
  payload: number;
}

export const deleteTaskCategory =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete<ApiResponse<TaskCategory>>(`task_cat/${id}`);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Success',
          message: `Category deleted`,
          type: 'default',
        },
      });

      dispatch<DeleteTaskCategoryaction>({
        type: actionTypes.deleteTaskCategory,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface UpdateTaskCategoryaction {
  type: actionTypes.updateTaskCategory;
  payload: TaskCategory;
}

export const updateTaskCategory =
  (id: number, formData: NewTaskCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.put<ApiResponse<TaskCategory>>(
        `/cat/$id`,
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

      dispatch<UpdateTaskCategoryaction>({
        type: actionTypes.updateTaskCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface AddTaskaction {
  type: actionTypes.addTask;
  payload: NewTask;
}

export const addTask = (formData: NewTask) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Task>>('/task', formData);

    dispatch<CreateNotificationaction>({
      type: actionTypes.createNotification,
      payload: {
        title: 'success',
        message: `Task created`,
        type: 'default',
      },
    });

    dispatch<AddTaskaction>({
      type: actionTypes.addTask,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export interface DeleteTaskaction {
  type: actionTypes.deleteTask;
  payload: {
    taskId: number;
    catId: number;
  };
}

export const deleteTask =
  (taskId: number, catId: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete<ApiResponse<unknown>>(`/fav/${taskId}`);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Success',
          message: `Task deleted.`,
          type: 'default',
        },
      });

      dispatch<DeleteTaskaction>({
        type: actionTypes.deleteTask,
        payload: {
          taskId,
          catId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface UpdateTaskaction {
  type: actionTypes.updateTask;
  payload: Task;
}

export const updateTask =
  (taskId: number, formData: Task) => async (dispatch: Dispatch) => {
    try {
      const task = (({
        content,
        color,
        task_category_id,
        is_done,
        is_important,
      }) => ({
        content,
        color,
        task_category_id,
        is_done,
        is_important,
      }))(formData);

      const res = await axios.put<ApiResponse<Task>>(`/task/${taskId}`, task);

      dispatch<CreateNotificationaction>({
        type: actionTypes.createNotification,
        payload: {
          title: 'Updated.',
          message: `Task updated successfully.`,
          type: 'default',
        },
      });

      dispatch<UpdateTaskaction>({
        type: actionTypes.updateTask,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
