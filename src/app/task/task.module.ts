import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { RouterModule } from '@angular/router';
import { TrelloTaskPopupComponent } from './trello-task-popup/trello-task-popup.component';

@NgModule({
  declarations: [TaskComponent, TaskViewComponent, TrelloTaskPopupComponent],
  imports: [CommonModule, RouterModule],
  exports: [TaskComponent],
})
export class TaskModule {}
