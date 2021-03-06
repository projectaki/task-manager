import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectListItem } from '../../core/models/project-list-item.interface';
import { CardCrudOptions } from '../../core/models/project-card-options.interface.';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: ProjectListItem;
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
