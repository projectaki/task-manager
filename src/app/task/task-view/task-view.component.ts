import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs';
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

  private taskId!: string;

  constructor(private fb: FormBuilder, private store: TaskStoreService, private route: ActivatedRoute) {
    this.form = fb.group({
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ taskId, projectId }) => {
      console.log(taskId, projectId);
      this.taskId = taskId;
      this.store.getProjectTasksAsync({ taskId, projectId });
    });

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
      id: this.taskId,
      taskView: item,
    });
  }
}
