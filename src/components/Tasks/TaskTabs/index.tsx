import * as React from 'react';

import { addTask, fetchTaskCategories } from '#store/actions';
import { GlobalState, Task, TaskCategory } from '#interfaces';
import { connect, ConnectedProps } from 'react-redux';
import Scrollbar from '#components/shared/Scrollbar';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from '#components/FormElements';
import SendIcon from '#components/shared/Icons/SendIcon';

import TaskSingle from '../TaskSingle';

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

  const [activeCat, setActiveCat] = React.useState<TaskCategory | null>(null);
  const [tasksHeight, setTasksHeight] = React.useState<number | undefined>(0);
  const [dispTasks, setDispTasks] = React.useState<Task[]>([]);

  const tasksRef = React.useRef<null | HTMLDivElement>(null);

  const filterTasks = (tasks: Task[], method: string): Task[] => {
    switch (method) {
      case 'created>asc':
        return tasks.sort((a, b) => (a.id < b.id ? 1 : -1));
      default:
        return tasks;
    }
  };

  const handleCategoryChange = (cat: TaskCategory) => {
    setActiveCat(cat);
    setDispTasks(filterTasks(cat.tasks, 'created>asc'));
  };

  React.useEffect(() => {
    if (taskCategories.length === 0) fetchTaskCategories();
    setActiveCat(taskCategories[0]);

    setDispTasks(filterTasks(taskCategories[0]?.tasks || [], 'created>asc'));
  }, [taskCategories]);

  React.useEffect(() => {
    setTasksHeight((tasksRef.current?.clientHeight || 200) - 200);
  });

  return (
    <>
      <div className="tasks__tabs">
        <h3 className="title">Task Categories</h3>
        <span className="separator" />
        {taskCategories.map((cat) => {
          return (
            <div
              onClick={() => handleCategoryChange(cat)}
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
              nuTask.task_category_id = activeCat?.id;
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
