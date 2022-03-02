import { Injectable } from '@angular/core';
import { delay, from, Observable, of, switchMap, throwError } from 'rxjs';
import { ProjectListItem } from '../projects/project-list-item.interface';
import { ProjectType } from '../projects/project-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  get(id: string): Observable<ProjectListItem> {
    return of({
      id: '1',
      name: 'Project 1',
      projectType: ProjectType.OWNER,
    }).pipe(delay(500));
  }

  list(id: string): Observable<ProjectListItem[]> {
    return of([
      { id: '1', name: 'Project 1', projectType: ProjectType.OWNER },
      { id: '2', name: 'Project 2', projectType: ProjectType.OWNER },
      { id: '3', name: 'Project 3', projectType: ProjectType.PARTICIPANT },
      { id: '4', name: 'Project 4', projectType: ProjectType.PARTICIPANT },
      { id: '5', name: 'Project 5', projectType: ProjectType.CLIENT },
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
}
