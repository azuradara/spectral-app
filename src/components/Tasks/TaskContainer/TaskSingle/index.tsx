import React from 'react';

import { motion } from 'framer-motion';
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

  const motionVariants = {
    hidden: {
      translateY: -10,
      opacity: 0,
    },
    visible: {
      opacity: task.is_done ? 0.3 : 1,
      translateY: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  const handleMark = () => {
    task.is_done = !task.is_done;
    updateTask(task.id, task);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants}
      onClick={() => handleMark()}
      className={`task ${task.is_done ? 'task--done' : ''}`}
      key={task.id}
    >
      <div>{task.is_done ? <TickBoxIcon /> : <SquareIcon />}</div>

      <div className="task__color" style={{ backgroundColor: task.color }} />
      {task.content}
    </motion.div>
  );
};

export default connector(TaskSingle);
