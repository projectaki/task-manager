import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectComponent } from './projects/project/project.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
