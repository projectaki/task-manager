import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
  },
  {
    path: ':taskId',
    loadChildren: () => import('../task/task.module').then(m => m.TaskModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectViewRoutingModule {}
