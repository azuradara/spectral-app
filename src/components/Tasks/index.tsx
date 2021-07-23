import React from 'react';
import TasksContainer from './TasksContainer';
import TaskTabs from './TaskTabs';

const Tasks = (): React.ReactElement => {
  return (
    <div className="tasks-page">
      <div className="container">
        <TaskTabs />
        <TasksContainer />
      </div>
    </div>
  );
};

export default Tasks;
