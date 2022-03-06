import { ProjectType } from '../enums/project-type.enum';

export interface ProjectListItem {
  id: string;
  name: string;
  projectType: ProjectType;
}
