import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ProjectRole } from '../enums/project-role.enum';
import { ProjectListItem } from '../models/project-list-item.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  get(): Observable<User> {
    return of({
      id: '1',
      email: 'user@user.com',
    } as User).pipe(delay(500));
  }

  create() {}
  update() {}

  createProject(project: ProjectListItem): Observable<ProjectListItem> {
    return of({ ...project, id: '99', role: ProjectRole.OWNER }).pipe(delay(500));
  }

  updateProject(project: ProjectListItem): Observable<ProjectListItem> {
    return of({ ...project, role: ProjectRole.OWNER }).pipe(delay(500));
  }

  deleteProject(id: string): Observable<string> {
    return of(id).pipe(delay(500));
  }

  listOwnedProjects(): Observable<ProjectListItem[]> {
    return of([
      { id: '1', name: 'Project 1' },
      { id: '2', name: 'Project 2' },
      { id: '3', name: 'Project 3' },
    ]).pipe(delay(500));
  }

  listParticipantProjects(): Observable<ProjectListItem[]> {
    return of([
      { id: '4', name: 'Project 4' },
      { id: '5', name: 'Project 5' },
    ]).pipe(delay(500));
  }

  listClientProjects(): Observable<ProjectListItem[]> {
    return of([
      { id: '6', name: 'Project 6' },
      { id: '7', name: 'Project 7' },
    ]).pipe(delay(500));
  }
}
