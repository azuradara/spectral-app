import * as React from 'react';

import { addTask, fetchTaskCategories } from '#store/actions';
import { GlobalState, Task, TaskCategory } from '#interfaces';
import { connect, ConnectedProps } from 'react-redux';
import TaskContainer from '../TaskContainer';

const mapStatetoProps = (state: GlobalState) => {
  return {
    taskCategories: state.task.taskCategories,
    seeking: state.task.seeking,
  };
};

const connector = connect(mapStatetoProps, { fetchTaskCategories, addTask });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const TaskTabs = (props: ComponentProps): React.ReactElement => {
  const { fetchTaskCategories, addTask, taskCategories, seeking } = props;

  const [activeCat, setActiveCat] = React.useState<TaskCategory>(
    taskCategories[0]
  );

  const filterTasks = (tasks: Task[], method: string): Task[] => {
    switch (method) {
      case 'created>asc':
        return tasks.sort((a, b) => (a.id < b.id ? 1 : -1));
      default:
        return tasks;
    }
  };

  const handleCategoryChange = (cat: TaskCategory) => {
    setActiveCat(cat);
  };

  React.useEffect(() => {
    if (taskCategories.length === 0) fetchTaskCategories();
    setActiveCat(taskCategories[0]);
  }, [fetchTaskCategories]);

  return (
    <>
      <div className="tasks__tabs">
        <h3 className="title">Task Categories</h3>
        <span className="separator" />
        {taskCategories.map((cat) => {
          return (
            <div
              onClick={() => handleCategoryChange(cat)}
              className="tab"
              key={cat.id}
            >
              <div
                className="tab__color"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </div>
          );
        })}
      </div>

      <TaskContainer category_id={activeCat.id} />
    </>
  );
};

export default connector(TaskTabs);
