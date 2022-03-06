import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectListItem } from '../project-list-item.interface';
import { ProjectCardOptions } from './project-card-options.interface.';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: ProjectListItem;
  @Input() isDeleteLoading!: boolean;
  @Input() options!: ProjectCardOptions;

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
