import * as React from 'react';

import { openModal, fetchTaskCategories } from '#store/actions';
import { GlobalState, TaskCategory } from '#interfaces';
import { connect, ConnectedProps } from 'react-redux';
import TaskContainer from '../TaskContainer';
import AddTaskCategoryModal from '#components/ModalContent/Tasks/AddTaskCategoryModal';
import { IcoBtn } from '#components/shared';
import AddIcon from '#components/shared/Icons/AddIcon';
import TaskCategorySingle from '../TaskCategorySingle';

const mapStatetoProps = (state: GlobalState) => {
  return {
    taskCategories: state.task.taskCategories,
    seeking: state.task.seeking,
  };
};

const connector = connect(mapStatetoProps, { fetchTaskCategories, openModal });

type ComponentProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const TaskTabs = (props: ComponentProps): React.ReactElement => {
  const { fetchTaskCategories, taskCategories, openModal } = props;

  const [activeCat, setActiveCat] = React.useState<TaskCategory | null>(
    taskCategories[0]
  );

  const handleCategoryChange = (cat: TaskCategory) => {
    setActiveCat(cat);
  };

  React.useEffect(() => {
    if (taskCategories.length === 0) fetchTaskCategories();
    setActiveCat(null);
  }, [fetchTaskCategories]);

  React.useEffect(() => {
    if (!taskCategories.find((t) => t.id == activeCat?.id)) setActiveCat(null);
  }, [taskCategories]);

  return (
    <>
      <div className="tasks__tabs">
        <h3 className="title">
          <span>Task Categories</span>
          <IcoBtn
            onMouseDown={(e) => {
              e.stopPropagation();
              openModal({
                title: 'Edit Bookmark',
                content: <AddTaskCategoryModal />,
              });
            }}
          >
            <AddIcon />
          </IcoBtn>
        </h3>
        <span className="separator" />
        {taskCategories.map((cat) => {
          return (
            <div key={cat.id} onClick={() => handleCategoryChange(cat)}>
              <TaskCategorySingle category={cat} />
            </div>
          );
        })}
      </div>

      {activeCat && <TaskContainer category_id={activeCat.id} />}
    </>
  );
};

export default connector(TaskTabs);
