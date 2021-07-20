import * as React from 'react';

import { fetchTaskCategories } from '#store/actions';
import { GlobalState, TaskCategory } from '#interfaces';
import { connect, ConnectedProps } from 'react-redux';
import { string } from 'yargs';

const mapStatetoProps = (state: GlobalState) => {
  return {
    taskCategories: state.task.taskCategories,
    seeking: state.task.seeking,
  };
};

const connector = connect(mapStatetoProps, { fetchTaskCategories });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const TasksContainer = (props: ComponentProps): React.ReactElement => {
  const { fetchTaskCategories, taskCategories, seeking } = props;

  React.useEffect(() => {
    if (taskCategories.length === 0) fetchTaskCategories();
  }, [fetchTaskCategories]);

  return (
    <div>
      {taskCategories.map(
        (cat: TaskCategory): React.ReactElement => (
          <div key={cat.id}>{cat.name}</div>
        )
      )}
    </div>
  );
};

export default connector(TasksContainer);
