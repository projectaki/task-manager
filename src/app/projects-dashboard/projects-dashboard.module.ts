import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TaskModule } from '../task/task.module';
import { SharedModule } from '../shared/shared.module';
import { MembersModule } from '../members/members.module';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectPageComponent } from './project-page/project-page.component';
import { FilterProjectRolePipe } from '../shared/pipes/filter-project-role.pipe';

@NgModule({
  declarations: [ProjectPageComponent, ProjectCardComponent, ProjectCreateComponent],
  imports: [CommonModule, ProjectRoutingModule, SharedModule, MembersModule],
})
export class ProjectsDashboardModule {}
