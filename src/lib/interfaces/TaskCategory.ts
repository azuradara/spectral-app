import { Model, Task } from '#interfaces';

export interface TaskCategory extends Model {
  name: string;
  color: string;
  tasks: Task[];
}

export interface NewTaskCategory {
  name: string;
  color: string;
}
