import { GlobalState, Task } from '#interfaces';
import { createSelector } from 'reselect';
import { partition } from '#utils';

export const selectAllTasks = createSelector(
  (state: GlobalState, category_index: number) =>
    state.task.taskCategories[category_index]?.tasks,
  (tasks) => {
    if (!tasks) return [[], []];
    return partition(tasks, (e) => !e.is_done) as [Task[], Task[]];
  }
);
