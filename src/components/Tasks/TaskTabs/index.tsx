import * as React from 'react';

import { addTask, fetchTaskCategories } from '#store/actions';
import { GlobalState, TaskCategory } from '#interfaces';
import { connect, ConnectedProps } from 'react-redux';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from '#components/FormElements';
import SendIcon from '#components/shared/Icons/SendIcon';

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

  React.useEffect(() => {
    console.log(taskCategories);
  }, [fetchTaskCategories]);

  const [activeCat, setActiveCat] = React.useState<number>(0);

  const getCatIdx = (id: number) =>
    taskCategories.findIndex((cat) => cat.id === id);

  return (
    <>
      <div className="tasks__tabs">
        <h3 className="title">Task Categories</h3>
        <span className="separator" />
        {taskCategories.map((cat) => {
          return (
            <div
              onClick={() => setActiveCat(getCatIdx(cat.id))}
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

      <div className="tasks__container">
        <div className="tasks__tasks">
          <h3 className="title">Tasks</h3>
          <span className="separator" />
          {taskCategories[activeCat]?.tasks.map((task) => {
            return (
              <div className="task" key={task.id}>
                <div
                  className="task__color"
                  style={{ backgroundColor: task.color }}
                />
                {task.content}
              </div>
            );
          })}
        </div>

        <div className="tasks__add">
          <Formik
            validationSchema={yup.object().shape({
              content: yup.string().required().max(2000),
            })}
            onSubmit={(e, { resetForm }) => {
              const nuTask: any = (({ content }) => ({ content }))(e);
              nuTask.task_category_id = taskCategories[activeCat].id;
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
    </>
  );
};

export default connector(TaskTabs);
