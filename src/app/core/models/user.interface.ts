import { ProjectListItem } from './project-list-item.interface';

export interface User {
  id: string;
  email: string;
  projects: ProjectListItem[];
}
