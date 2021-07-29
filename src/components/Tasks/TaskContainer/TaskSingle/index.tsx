import React from 'react';

import { motion } from 'framer-motion';
import { connect, ConnectedProps } from 'react-redux';

import { Task } from '#interfaces';

import { deleteTask, updateTask } from '#store/actions';

import SquareIcon from '#components/shared/Icons/SquareIcon';
import TickBoxIcon from '#components/shared/Icons/TickBoxIcon';
import { IcoBtn } from '#components/shared';
import TrashIcon from '#components/shared/Icons/TrashIcon';

const mapStatetoProps = null;

const connector = connect(mapStatetoProps, { updateTask, deleteTask });

type ComponentProps = { task: Task } & ConnectedProps<typeof connector>;

const TaskSingle = (props: ComponentProps) => {
  const { task, updateTask, deleteTask } = props;

  const [done, setDone] = React.useState(task.is_done);

  const motionVariants = {
    hidden: {
      translateY: -10,
      opacity: 0,
    },
    visible: {
      opacity: done ? 0.3 : 1,
      translateY: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  const handleMark = () => {
    setDone(!done);
    task.is_done = !task.is_done;
    updateTask(task.id, task);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants}
      onClick={() => handleMark()}
      className={`task ${done ? 'task--done' : ''}`}
      key={task.id}
    >
      <div className="task__color" style={{ backgroundColor: task.color }} />
      <div className="task__inner">
        <div>{done ? <TickBoxIcon /> : <SquareIcon />}</div>
        <p>{task.content}</p>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id, task.task_category_id);
        }}
        className="task__remove"
      >
        <IcoBtn>
          <TrashIcon />
        </IcoBtn>
      </div>
    </motion.div>
  );
};

export default connector(TaskSingle);
