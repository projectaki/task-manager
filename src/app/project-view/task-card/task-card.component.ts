import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardCrudOptions } from 'src/app/core/models/project-card-options.interface.';
import { ProjectTaskItem } from 'src/app/core/models/project-task-item.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() projectTaskItem!: ProjectTaskItem;
  @Input() isDeleteLoading!: boolean;
  @Input() options!: CardCrudOptions;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onDelete($event: Event) {
    this.delete.emit($event);
  }

  onEdit(id: string) {
    this.edit.emit(id);
  }
}
