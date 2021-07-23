import { GlobalState } from '#interfaces';
import { createSelector } from 'reselect';

export const selectActiveTasks = createSelector(
  (state: GlobalState, category_index: number) =>
    state.task.taskCategories[category_index].tasks,
  (tasks) => {
    return tasks.filter((t) => {
      console.log('filtering');
      return t.is_done == false;
    });
  }
);

export const selectInactiveTasks = createSelector(
  (state: GlobalState, category_index: number) =>
    state.task.taskCategories[category_index].tasks,
  (tasks) => {
    return tasks.filter((t) => {
      console.log('filtering');
      return t.is_done == true;
    });
  }
);
