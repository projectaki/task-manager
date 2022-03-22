import { Injectable } from '@angular/core';
import { delay, from, Observable, of, switchMap, throwError } from 'rxjs';
import { ProjectListItem } from '../models/project-list-item.interface';
import { ProjectRole } from '../enums/project-role.enum';
import { Project } from '../models/project.interface';
import { ProjectUser } from '../models/project-user.interface';
import { TaskTag } from '../enums/task-tag.enum';
import { ProjectTaskItem } from '../models/project-task-item.interface';
import { ItemService } from '../base-classes/entities-state-base.class';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements ItemService<ProjectListItem> {
  constructor() {}

  get(id: string): Observable<Project> {
    return of({
      id: '1',
      name: 'Project 1',
      projectUsers: [
        {
          id: '1',
          accepted: true,
          role: ProjectRole.OWNER,
        },
        {
          id: '2',
          accepted: false,
          role: ProjectRole.PARTICIPANT,
        },
        {
          id: '3',
          accepted: true,
          role: ProjectRole.CLIENT,
        },
      ],
    } as Project).pipe(delay(500));
  }

  list(): Observable<ProjectListItem[]> {
    return of([
      { id: '1', name: 'Project 1', role: ProjectRole.OWNER },
      { id: '2', name: 'Project 2', role: ProjectRole.OWNER },
      { id: '3', name: 'Project 3', role: ProjectRole.PARTICIPANT },
      { id: '4', name: 'Project 4', role: ProjectRole.PARTICIPANT },
      { id: '5', name: 'Project 5', role: ProjectRole.CLIENT },
    ]).pipe(delay(500));
  }

  add(project: ProjectListItem): Observable<ProjectListItem> {
    return of({ ...project, id: '99', role: ProjectRole.OWNER }).pipe(
      delay(500)
      //switchMap(() => throwError(() => new Error('erropr')))
    );
  }

  update(project: ProjectListItem): Observable<ProjectListItem> {
    return of({ ...project, role: ProjectRole.OWNER }).pipe(delay(500));
  }

  delete(id: string): Observable<string> {
    return of(id).pipe(delay(500));
  }
}
