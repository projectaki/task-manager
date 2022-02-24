import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectComponent } from './projects/project/project.component';
import { TaskViewComponent } from './task/task-view/task-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        component: ProjectListComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
      },
      {
        path: 'projects/:id/task/:id',
        component: TaskViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
