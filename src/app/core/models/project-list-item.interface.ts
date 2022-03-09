import { ProjectRole } from '../enums/project-role.enum';

export interface ProjectListItem {
  id: string;
  name: string;
  role: ProjectRole;
}