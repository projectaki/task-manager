import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './task-view/task-view.component';

const routes: Routes = [
  {
    path: ':taskId',
    component: TaskViewComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
