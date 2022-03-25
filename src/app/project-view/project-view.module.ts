import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersModule } from '../members/members.module';
import { SharedModule } from '../shared/shared.module';
import { FilterCompletedTaskPipe } from './filter-completed-task.pipe';
import { ProjectViewRoutingModule } from './project-view-routing.module';
import { ProjectComponent } from './project/project.component';
import { ProjectuserToMemberPipe } from './projectuser-to-member.pipe';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  declarations: [
    ProjectComponent,
    TaskCardComponent,
    TaskCreateComponent,
    ProjectuserToMemberPipe,
    FilterCompletedTaskPipe,
  ],
  imports: [CommonModule, SharedModule, MembersModule, ProjectViewRoutingModule],
})
export class ProjectViewModule {}
