import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { SharedModule } from '../shared/shared.module';
import { MembersModule } from '../members/members.module';
import { ProjectViewRoutingModule } from './project-view-routing.module';

@NgModule({
  declarations: [ProjectComponent, TaskCardComponent, TaskCreateComponent],
  imports: [CommonModule, SharedModule, MembersModule, ProjectViewRoutingModule],
})
export class ProjectViewModule {}
