import { Model } from '#interfaces';

export interface Task extends Model {
  content: string;
  task_category_id: number;
  is_important: boolean;
  is_done: boolean;
  color: string;
}

export interface NewTask {
  content: string;
  task_category_id: number;
  color: string;
}
