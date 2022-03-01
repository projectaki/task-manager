import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() isDeleteLoading!: boolean;

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
