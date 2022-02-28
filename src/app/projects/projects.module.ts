import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { TaskModule } from '../task/task.module';
import { SharedModule } from '../shared/shared.module';
import { MembersModule } from '../members/members.module';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectPageComponent } from './project-page/project-page.component';

@NgModule({
  declarations: [ProjectPageComponent, ProjectComponent, ProjectCardComponent, ProjectCreateComponent],
  imports: [CommonModule, ProjectRoutingModule, TaskModule, SharedModule, MembersModule],
})
export class ProjectsModule {}
