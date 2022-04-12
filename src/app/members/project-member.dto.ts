import { ProjectRole } from '../core/enums/project-role.enum';

export interface ProjectMember {
  accepted: boolean;
  role: ProjectRole;
  user: string;
}
