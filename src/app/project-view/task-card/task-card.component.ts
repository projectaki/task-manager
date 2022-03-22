import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TaskTag } from 'src/app/core/enums/task-tag.enum';
import { CardCrudOptions } from 'src/app/core/models/project-card-options.interface.';
import { ProjectTaskItem } from 'src/app/core/models/project-task-item.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input() projectTaskItem!: ProjectTaskItem;
  @Input() isDeleteLoading!: boolean;
  @Input() set isEditLoading(val: boolean) {
    const checkBox = this.form.get('checked');
    val ? checkBox?.disable({ emitEvent: false }) : checkBox?.enable({ emitEvent: false });
  }
  @Input() options!: CardCrudOptions;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter<ProjectTaskItem>();
  @Output() setComplete = new EventEmitter<ProjectTaskItem>();

  form!: FormGroup;
  TaskTag = TaskTag;

  private unsub$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      checked: ['', false],
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  ngOnInit(): void {
    this.form.patchValue(
      {
        checked: this.projectTaskItem.completed,
      },
      { emitEvent: false }
    );

    this.initObservers();
  }

  initObservers() {
    this.form
      .get('checked')
      ?.valueChanges.pipe(takeUntil(this.unsub$))
      .subscribe((completed: boolean) => {
        this.setComplete.emit({ ...this.projectTaskItem, completed });
      });
  }

  onDelete($event: Event) {
    this.delete.emit($event);
  }

  onEdit(item: ProjectTaskItem) {
    this.edit.emit(item);
  }
}
