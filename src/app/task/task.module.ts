import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { RouterModule } from '@angular/router';
import { TrelloTaskPopupComponent } from './trello-task-popup/trello-task-popup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskCardComponent, TaskViewComponent, TrelloTaskPopupComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [TaskCardComponent],
})
export class TaskModule {}
