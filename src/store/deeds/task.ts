import axios from 'axios';
import { DeedTypes } from '#store/deeds/deedTypes';
import { Dispatch } from 'redux';
import {
  TaskCategory,
  ApiResponse,
  NewTaskCategory,
  Task,
  NewTask,
} from '#interfaces';
import { CreateNotificationDeed } from '#store/deeds';

export interface FetchTaskCategoriesDeed<T> {
  type:
    | DeedTypes.fetchTaskCategories
    | DeedTypes.fetchTaskCategoriesSuccess
    | DeedTypes.fetchTaskCategoriesError;
  payload: T;
}

export const fetchTaskCategories = () => async (dispatch: Dispatch) => {
  dispatch<FetchTaskCategoriesDeed<undefined>>({
    type: DeedTypes.fetchTaskCategories,
    payload: undefined,
  });

  try {
    const res = await axios.get<ApiResponse<TaskCategory[]>>('/task_cat');

    dispatch<FetchTaskCategoriesDeed<TaskCategory[]>>({
      type: DeedTypes.fetchTaskCategoriesSuccess,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('err');
  }
};

export interface AddTaskCategoryDeed {
  type: DeedTypes.addTaskCategory;
  payload: TaskCategory;
}

export const addTaskCategory =
  (formData: NewTaskCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<ApiResponse<TaskCategory>>(
        '/task_cat',
        formData
      );

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'success',
          message: `Category ${formData.name} created.`,
          type: 'default',
        },
      });

      dispatch<AddTaskCategoryDeed>({
        type: DeedTypes.addTaskCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface DeleteTaskCategoryDeed {
  type: DeedTypes.deleteTaskCategory;
  payload: number;
}

export const deleteTaskCategory =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete<ApiResponse<TaskCategory>>(`task_cat/${id}`);

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'Success',
          message: `Category deleted`,
          type: 'default',
        },
      });

      dispatch<DeleteTaskCategoryDeed>({
        type: DeedTypes.deleteTaskCategory,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface UpdateTaskCategoryDeed {
  type: DeedTypes.updateTaskCategory;
  payload: TaskCategory;
}

export const updateTaskCategory =
  (id: number, formData: NewTaskCategory) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.put<ApiResponse<TaskCategory>>(
        `/cat/$id`,
        formData
      );

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${formData.name} updated`,
          type: 'default',
        },
      });

      dispatch<UpdateTaskCategoryDeed>({
        type: DeedTypes.updateTaskCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface AddTaskDeed {
  type: DeedTypes.addTask;
  payload: Task;
}

export const addTask = (formData: NewTask) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Task>>('/task', formData);

    dispatch<CreateNotificationDeed>({
      type: DeedTypes.createNotification,
      payload: {
        title: 'success',
        message: `Task created`,
        type: 'default',
      },
    });

    dispatch<AddTaskDeed>({
      type: DeedTypes.addTask,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export interface DeleteTaskDeed {
  type: DeedTypes.deleteTask;
  payload: {
    taskId: number;
    catId: number;
  };
}

export const deleteTask =
  (taskId: number, catId: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete<ApiResponse<unknown>>(`/fav/${taskId}`);

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'Success',
          message: `Task deleted.`,
          type: 'default',
        },
      });

      dispatch<DeleteTaskDeed>({
        type: DeedTypes.deleteTask,
        payload: {
          taskId,
          catId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface UpdateTaskDeed {
  type: DeedTypes.updateTask;
  payload: Task;
}

export const updateTask =
  (taskId: number, formData: NewTask) => async (dispatch: Dispatch) => {
    try {
      const task = (({ content, color, task_category_id }) => ({
        content,
        color,
        task_category_id,
      }))(formData);

      const res = await axios.put<ApiResponse<Task>>(`/fav/${taskId}`, task);

      dispatch<CreateNotificationDeed>({
        type: DeedTypes.createNotification,
        payload: {
          title: 'Updated.',
          message: `Task updated successfully.`,
          type: 'default',
        },
      });

      dispatch<DeleteTaskDeed>({
        type: DeedTypes.deleteTask,
        payload: {
          taskId,
          catId: task.task_category_id,
        },
      });

      dispatch<UpdateTaskDeed>({
        type: DeedTypes.updateTask,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
