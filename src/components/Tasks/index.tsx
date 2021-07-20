import React from 'react';
import TasksContainer from './TasksContainer';

const Tasks = (): React.ReactElement => {
  return (
    <div>
      <div className="tasks">
        <TasksContainer />
      </div>
    </div>
  );
};

export default Tasks;
