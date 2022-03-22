import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TaskTag } from '../enums/task-tag.enum';
import { ProjectTaskItem } from '../models/project-task-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectTaskService {
  constructor() {}

  add(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return of({ ...task, completed: false }).pipe(delay(500));
  }

  update(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return of({ ...task }).pipe(delay(500));
  }

  delete(projectId: string, taskId: string): Observable<string> {
    return of(taskId).pipe(delay(500));
  }

  get(taskId: string): Observable<ProjectTaskItem> {
    return of({
      id: taskId,
      title: 'Task ' + taskId,
      completed: false,
      tag: TaskTag.BUG,
      description: 'test descripion' + taskId,
    }).pipe(delay(500));
  }

  list(projectId: string): Observable<ProjectTaskItem[]> {
    return of([
      {
        id: '1',
        title: 'Task 1',
        completed: false,
        tag: TaskTag.BUG,
      },
      {
        id: '2',
        title: 'Task 2',
        completed: false,
        tag: TaskTag.FEATURE,
      },
      {
        id: '3',
        title: 'Task 3',
        completed: true,
        tag: TaskTag.BUG,
      },
    ]).pipe(delay(500));
  }
}
