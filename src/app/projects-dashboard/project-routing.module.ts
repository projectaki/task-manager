import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from '../task/task-view/task-view.component';
import { ProjectPageComponent } from './project-page/project-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectPageComponent,
  },
  {
    path: ':projectId',
    loadChildren: () => import('../project-view/project-view.module').then(m => m.ProjectViewModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
