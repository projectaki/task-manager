import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TaskTag } from '../enums/task-tag.enum';
import { ProjectTaskItem } from '../models/project-task-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  get(taskId: string): Observable<ProjectTaskItem> {
    return of({
      id: taskId,
      title: 'Task ' + taskId,
      completed: false,
      tag: TaskTag.BUG,
      description: 'test descripion' + taskId,
    }).pipe(delay(500));
  }

  update(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return of({ ...task }).pipe(delay(500));
  }
}
