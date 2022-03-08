import { ProjectRole } from '../enums/project-role.enum';

export interface ProjectUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: ProjectRole;
  accepted: boolean;
}
