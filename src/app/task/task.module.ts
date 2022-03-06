import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../project-view/task-card/task-card.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { RouterModule } from '@angular/router';
import { TrelloTaskPopupComponent } from './trello-task-popup/trello-task-popup.component';
import { SharedModule } from '../shared/shared.module';
import { TaskCreateComponent } from '../project-view/task-create/task-create.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskViewComponent, TrelloTaskPopupComponent],
  imports: [CommonModule, RouterModule, SharedModule, TaskRoutingModule],
  exports: [],
})
export class TaskModule {}
