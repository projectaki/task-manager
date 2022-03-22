import { ProjectRole } from '../core/enums/project-role.enum';

export interface MemberCreate {
  id: string;
  email: string;
  role: ProjectRole;
  projectId: string;
}
