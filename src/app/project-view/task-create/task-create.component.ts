import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskTag } from 'src/app/core/enums/task-tag.enum';
import { CreateModalBase } from 'src/app/core/base-classes/create-modal-base.directive';
import { ProjectTaskItem } from 'src/app/core/models/project-task-item.interface';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent extends CreateModalBase<ProjectTaskItem> {
  @Input() tags: TaskTag[] = [TaskTag.BUG, TaskTag.FEATURE];
  @Input() set task(val: ProjectTaskItem | undefined) {
    this._task = val;
    this.initForm();
  }
  get task() {
    return this._task;
  }
  private _task?: ProjectTaskItem;

  constructor(private fb: FormBuilder) {
    super();
    this.form = fb.group({
      id: [''],
      title: ['', Validators.required],
      tag: ['', Validators.required],
    });
  }

  initForm() {
    if (this.task) {
      this.form.patchValue({
        id: this.task.id,
        title: this.task.title,
        tag: this.task.tag,
      });
    }
  }
}
