import { DeedTypes, Deed } from '#store/deeds';
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

const fetchTaskCategories = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: true,
    err: undefined,
  };
};

const fetchTaskCategoriesSuccess = (state: State, deed: Deed): State => {
  return {
    ...state,
    seeking: false,
    taskCategories: deed.payload,
  };
};

const addTaskCategory = (state: State, deed: Deed): State => {
  return {
    ...state,
    taskCategories: [
      ...state.taskCategories,
      {
        ...deed.payload,
        tasks: [],
      },
    ],
  };
};

const addTask = (state: State, deed: Deed): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === deed.payload.task_category_id
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
            ...deed.payload,
          },
        ],
      },
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const deleteTaskCategory = (state: State, deed: Deed): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === deed.payload
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const updateTaskCategory = (state: State, deed: Deed): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === deed.payload
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      {
        ...deed.payload,
      },
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const deleteTask = (state: State, deed: Deed): State => {
  const idx = state.taskCategories.findIndex(
    (cat: TaskCategory) => cat.id === deed.payload.catId
  );

  return {
    ...state,
    taskCategories: [
      ...state.taskCategories.slice(0, idx),
      {
        ...state.taskCategories[idx],
        tasks: [
          ...state.taskCategories[idx].tasks.filter(
            (task: Task) => task.id !== deed.payload.taskId
          ),
        ],
      },
      ...state.taskCategories.slice(idx + 1),
    ],
  };
};

const updateTask = (state: State, deed: Deed): State => {
  const catIdx = state.taskCategories.findIndex(
    (category: TaskCategory) => category.id === deed.payload.category_id
  );
  const favIdx = state.taskCategories[catIdx].tasks.findIndex(
    (favorite: Task) => favorite.id === deed.payload.id
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
            ...deed.payload,
          },
          ...state.taskCategories[catIdx].tasks.slice(favIdx + 1),
        ],
      },
      ...state.taskCategories.slice(catIdx + 1),
    ],
  };
};

const taskReducer = (state: State = iState, deed: Deed): State => {
  switch (deed.type) {
    case DeedTypes.fetchTaskCategories:
      return fetchTaskCategories(state, deed);

    case DeedTypes.fetchCategoriesSuccess:
      return fetchTaskCategoriesSuccess(state, deed);

    case DeedTypes.addTaskCategory:
      return addTaskCategory(state, deed);

    case DeedTypes.deleteTaskCategory:
      return deleteTaskCategory(state, deed);

    case DeedTypes.updateTaskCategory:
      return updateTaskCategory(state, deed);

    case DeedTypes.addTask:
      return updateTask(state, deed);

    case DeedTypes.updateTask:
      return updateTask(state, deed);

    case DeedTypes.deleteTask:
      return deleteTask(state, deed);

    default:
      return state;
  }
};

export default taskReducer;
