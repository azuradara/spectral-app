import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Task } from '#interfaces';

import { updateTask } from '#store/actions';

import SquareIcon from '#components/shared/Icons/SquareIcon';
import TickBoxIcon from '#components/shared/Icons/TickBoxIcon';

const mapStatetoProps = null;

const connector = connect(mapStatetoProps, { updateTask });

type ComponentProps = { task: Task } & ConnectedProps<typeof connector>;

const TaskSingle = (props: ComponentProps) => {
  const { task, updateTask } = props;

  const handleMark = () => {
    task.is_done = !task.is_done;
    updateTask(task.id, task);
  };

  return (
    <div onClick={() => handleMark()} className="task" key={task.id}>
      <div>{task.is_done ? <TickBoxIcon /> : <SquareIcon />}</div>

      <div className="task__color" style={{ backgroundColor: task.color }} />
      {task.content}
    </div>
  );
};

export default connector(TaskSingle);
