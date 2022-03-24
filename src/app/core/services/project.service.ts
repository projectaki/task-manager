import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ItemService } from '../base-classes/entities-state-base.class';
import { ProjectRole } from '../enums/project-role.enum';
import { ProjectListItem } from '../models/project-list-item.interface';
import { Project } from '../models/project.interface';

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

  createTask() {}
  updateTask() {}
  deleteTask() {}
  listTasks() {}

  inviteUser() {}
  uninviteUser() {}
  listUsers() {}
}
