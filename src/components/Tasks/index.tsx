import React from 'react';

import TaskTabs from './TaskTabs';

const Tasks = (): React.ReactElement => {
  return (
    <div className="tasks-page">
      <div className="container">
        <TaskTabs />
      </div>
    </div>
  );
};

export default Tasks;
