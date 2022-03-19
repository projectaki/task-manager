import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, take } from 'rxjs';
import { ProjectListItem } from 'src/app/core/models/project-list-item.interface';
import { ProjectTaskItem } from 'src/app/core/models/project-task-item.interface';
import { TaskStoreService } from '../task-store.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  providers: [TaskStoreService],
})
export class TaskViewComponent implements OnInit {
  form!: FormGroup;

  vm$ = this.store.vm$;

  constructor(private fb: FormBuilder, private store: TaskStoreService) {
    this.form = fb.group({
      description: [''],
    });
  }

  ngOnInit(): void {
    this.store.getProjectTasksAsync('1');

    this.store.taskView$
      .pipe(
        filter(x => !!x),
        take(1)
      )
      .subscribe(x =>
        this.form.patchValue({
          description: x?.description,
        })
      );
  }

  submit(item: ProjectTaskItem) {
    this.store.updateTaskViewAsync({
      id: '1',
      taskView: item,
    });
  }
}
