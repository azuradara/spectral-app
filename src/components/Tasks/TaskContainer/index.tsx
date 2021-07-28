import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Scrollbar from '#components/shared/Scrollbar';
import { addTask } from '#store/actions';

import { selectAllTasks } from '#store/selectors';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from '#components/FormElements';
import SendIcon from '#components/shared/Icons/SendIcon';

import TaskSingle from './TaskSingle';
import { GlobalState } from '#interfaces';

import { motion } from 'framer-motion';

const mapStatetoProps = (state: GlobalState, { category_id }: any) => {
  const category_index = state.task.taskCategories.findIndex(
    (c) => c.id === category_id
  );

  return {
    category: state.task.taskCategories[category_index],
    tasks: () => selectAllTasks(state, category_index),
  };
};

const connector = connect(mapStatetoProps, { addTask });

type ComponentProps = { category_id: number } & ConnectedProps<
  typeof connector
>;

const motionVariants = {
  hidden: {
    translateX: -50,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    translateX: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const TaskContainer = (props: ComponentProps) => {
  const { category_id, addTask, category, tasks } = props;

  const [tasksHeight, setTasksHeight] = React.useState<number | undefined>(0);
  const tasksRef = React.useRef<null | HTMLDivElement>(null);

  const [activeTasks, inactiveTasks] = tasks();

  React.useEffect(() => {
    setTasksHeight((tasksRef.current?.clientHeight || 170) - 170);
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants}
      className="tasks__container"
      ref={tasksRef}
    >
      <div className="tasks__tasks">
        <h3 className="title">{category.name}</h3>
        <span className="separator" />
        <Scrollbar autoHeight autoHeightMin={tasksHeight}>
          <div className="tasks__inner">
            <div className="tasks__inner--active">
              {activeTasks.map((task) => {
                return <TaskSingle key={task.id} task={task} />;
              })}
            </div>
            <div className="tasks__inner--inactive">
              {inactiveTasks.map((task) => {
                return <TaskSingle key={task.id} task={task} />;
              })}
            </div>
          </div>
        </Scrollbar>
      </div>

      <div className="tasks__add">
        <Formik
          validationSchema={yup.object().shape({
            content: yup.string().required().max(2000),
          })}
          onSubmit={(e, { resetForm }) => {
            const nuTask: any = (({ content }) => ({ content }))(e);
            nuTask.task_category_id = category_id;
            nuTask.color = '#D3D3D3';
            resetForm({});

            addTask(nuTask);
          }}
          initialValues={{ content: '' }}
        >
          {(formik) => {
            return (
              <Form>
                <TextInput name="content" label="Add a new task" />

                <button type="submit" className="ico-btn btn btn-default">
                  <SendIcon />
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </motion.div>
  );
};

export default connector(TaskContainer);
