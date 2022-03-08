import { Injectable } from '@angular/core';
import { delay, from, Observable, of, switchMap, throwError } from 'rxjs';
import { ProjectListItem } from '../models/project-list-item.interface';
import { ProjectRole } from '../enums/project-role.enum';
import { Project } from '../models/project.interface';
import { ProjectUser } from '../models/project-user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
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

  list(userid: string): Observable<ProjectListItem[]> {
    return of([
      { id: '1', name: 'Project 1', role: ProjectRole.OWNER },
      { id: '2', name: 'Project 2', role: ProjectRole.OWNER },
      { id: '3', name: 'Project 3', role: ProjectRole.PARTICIPANT },
      { id: '4', name: 'Project 4', role: ProjectRole.PARTICIPANT },
      { id: '5', name: 'Project 5', role: ProjectRole.CLIENT },
    ]).pipe(delay(500));
  }

  add(project: ProjectListItem): Observable<ProjectListItem> {
    return of(project).pipe(
      delay(500)
      //switchMap(() => throwError(() => new Error('erropr')))
    );
  }

  update(project: ProjectListItem): Observable<ProjectListItem> {
    return of(project).pipe(delay(500));
  }

  delete(id: string): Observable<string> {
    return of(id).pipe(delay(500));
  }

  addProjectUser(projectId: string, projectUser: ProjectUser): Observable<ProjectUser> {
    return of(projectUser).pipe(delay(500));
  }

  removeProjectUser(projectId: string, projectUserId: string): Observable<string> {
    return of(projectUserId).pipe(delay(500));
  }

  listProjectUsers(projectId: string): Observable<ProjectUser[]> {
    return of([
      {
        id: '1',
        name: 'Akos',
        email: 'a@a.com',
        company: 'HR',
        accepted: true,
        role: ProjectRole.OWNER,
      },
      {
        id: '2',
        name: 'Marysia',
        email: 'a@a.com',
        company: 'JAPAN',
        accepted: false,
        role: ProjectRole.PARTICIPANT,
      },
      {
        id: '3',
        name: 'Jeff',
        email: 'a@a.com',
        company: 'MY HOSUE',
        accepted: true,
        role: ProjectRole.CLIENT,
      },
    ]).pipe(delay(500));
  }
}
