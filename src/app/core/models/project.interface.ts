import { ProjectMember } from 'src/app/members/project-member.dto';

export interface Project {
  id: string;
  name: string;
  members: ProjectMember[];
}
