import { ProjectRole } from '../enums/project-role.enum';
import { ProjectUser } from './project-user.interface';

export interface Project {
  id: string;
  name: string;
  projectUsers: ProjectUser[];
}
