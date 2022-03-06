import { ProjectType } from './project-type.enum';

export interface Project {
  id: string;
  name: string;
  role: ProjectType;
}
