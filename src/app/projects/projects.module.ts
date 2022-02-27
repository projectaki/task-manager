import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { TaskModule } from '../task/task.module';
import { SharedModule } from '../shared/shared.module';
import { MembersModule } from '../members/members.module';
import { ProjectCreateComponent } from './project-create/project-create.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectComponent, ProjectCardComponent, ProjectCreateComponent],
  imports: [CommonModule, RouterModule, TaskModule, SharedModule, MembersModule],
})
export class ProjectsModule {}
