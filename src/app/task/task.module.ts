import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { RouterModule } from '@angular/router';
import { TrelloTaskPopupComponent } from './trello-task-popup/trello-task-popup.component';
import { SharedModule } from '../shared/shared.module';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  declarations: [TaskCardComponent, TaskViewComponent, TrelloTaskPopupComponent, TaskCreateComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [TaskCardComponent, TaskCreateComponent],
})
export class TaskModule {}
