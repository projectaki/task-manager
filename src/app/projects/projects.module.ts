import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { TaskModule } from '../task/task.module';

@NgModule({
  declarations: [ProjectListComponent, ProjectComponent, ProjectCardComponent],
  imports: [CommonModule, RouterModule, TaskModule],
})
export class ProjectsModule {}
