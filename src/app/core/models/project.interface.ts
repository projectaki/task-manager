import { ProjectType } from '../enums/project-type.enum';

export interface Project {
  id: string;
  name: string;
  role: ProjectType;
}
