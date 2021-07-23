import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Scrollbar from '#components/shared/Scrollbar';
import { addTask } from '#store/actions';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from '#components/FormElements';
import SendIcon from '#components/shared/Icons/SendIcon';

import TaskSingle from '../TaskSingle';
import { GlobalState } from '#interfaces';

const mapStatetoProps = (state: GlobalState) => {
  return {
    taskCategories: state.task.taskCategories,
  };
};

const connector = connect(mapStatetoProps, { addTask });

type ComponentProps = { category_id: number } & ConnectedProps<
  typeof connector
>;

const TaskContainer = (props: ComponentProps) => {
  const { category_id, taskCategories, addTask } = props;

  const [tasksHeight, setTasksHeight] = React.useState<number | undefined>(0);
  const tasksRef = React.useRef<null | HTMLDivElement>(null);

  const category_index = taskCategories.findIndex((c) => c.id === category_id);

  // for now
  const dispTasks = taskCategories[category_index].tasks;

  React.useEffect(() => {
    setTasksHeight((tasksRef.current?.clientHeight || 200) - 200);
  });

  return (
    <div className="tasks__container" ref={tasksRef}>
      <div className="tasks__tasks">
        <h3 className="title">Tasks</h3>
        <span className="separator" />
        <Scrollbar autoHeight autoHeightMin={tasksHeight}>
          <div className="tasks__inner">
            {dispTasks.map((task) => {
              return <TaskSingle key={task.id} task={task} />;
            })}
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
    </div>
  );
};

export default connector(TaskContainer);
