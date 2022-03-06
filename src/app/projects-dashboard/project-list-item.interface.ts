import { ProjectType } from './project-type.enum';

export interface ProjectListItem {
  id: string;
  name: string;
  projectType: ProjectType;
}
