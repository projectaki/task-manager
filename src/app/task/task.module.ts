import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { RouterModule } from '@angular/router';
import { TrelloTaskPopupComponent } from './trello-task-popup/trello-task-popup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskComponent, TaskViewComponent, TrelloTaskPopupComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [TaskComponent],
})
export class TaskModule {}
