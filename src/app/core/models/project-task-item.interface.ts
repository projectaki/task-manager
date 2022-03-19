import { TaskTag } from '../enums/task-tag.enum';

export interface ProjectTaskItem {
  id: string;
  title: string;
  completed: boolean;
  tag: TaskTag;
  description?: string;
}
