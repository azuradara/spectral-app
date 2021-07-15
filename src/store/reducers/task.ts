import { actionTypes, Action } from '#store/actions';
import { Task, TaskCategory } from '#interfaces';

export interface State {
  seeking: boolean;
  err: string | undefined;
  taskCategories: TaskCategory[];
}

const iState: State = {
  seeking: true,
  err: undefined,
  taskCategories: [],
};

const fetchTaskCategories = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const fetchTaskCategoriesSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    seeking: false,
    taskCategories: action.payload,
  };
};

const addTaskCategory = (state: State, action: Action): State => {
  return {
    ...state,
    taskCategories: [
      ...state.taskCategories,
      {
        ...action.payload,
        tasks: [],
      },
    ],
  };
};

const addTask = (state: State, action: Action): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === action.payload.task_category_id
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      {
        ...state.taskCategories[idx],
        tasks: [
          ...state.taskCategories[idx].tasks,
          {
            ...action.payload,
          },
        ],
      },
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const deleteTaskCategory = (state: State, action: Action): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === action.payload
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const updateTaskCategory = (state: State, action: Action): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === action.payload
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      {
        ...action.payload,
      },
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const deleteTask = (state: State, action: Action): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === action.payload.catId
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      {
        ...state.taskCategories[idx],
        tasks: [
          ...state.taskCategories[idx].tasks.filter(
            (task: Task) => task.id !== action.payload.taskId
          ),
        ],
      },
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const updateTask = (state: State, action: Action): State => {
  const catIdx = state.taskCategories.findIndex(
    (category: TaskCategory) => category.id === action.payload.category_id
  );
  const favIdx = state.taskCategories[catIdx].tasks.findIndex(
    (favorite: Task) => favorite.id === action.payload.id
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, catIdx),
      {
        ...state.taskCategories[catIdx],
        tasks: [
          ...state.taskCategories[catIdx].tasks.slice(0, favIdx),
          {
            ...action.payload,
          },
          ...state.taskCategories[catIdx].tasks.slice(favIdx + 1),
        ],
      },
      ...state.taskCategories.slice(catIdx + 1),
    ],
  };
};

const taskReducer = (state: State = iState, action: Action): State => {
  switch (action.type) {
    case actionTypes.fetchTaskCategories:
      return fetchTaskCategories(state, action);

    case actionTypes.fetchTaskCategoriesSuccess:
      return fetchTaskCategoriesSuccess(state, action);

    case actionTypes.addTaskCategory:
      return addTaskCategory(state, action);

    case actionTypes.deleteTaskCategory:
      return deleteTaskCategory(state, action);

    case actionTypes.updateTaskCategory:
      return updateTaskCategory(state, action);

    case actionTypes.addTask:
      return updateTask(state, action);

    case actionTypes.updateTask:
      return updateTask(state, action);

    case actionTypes.deleteTask:
      return deleteTask(state, action);

    default:
      return state;
  }
};

export default taskReducer;
