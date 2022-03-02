import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { TaskViewComponent } from '../task/task-view/task-view.component';
import { ProjectPageComponent } from './project-page/project-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectPageComponent,
  },
  {
    path: ':projectId',
    component: ProjectComponent,
  },
  {
    path: ':projectId/task',
    loadChildren: () => import('../task/task.module').then(m => m.TaskModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
