import { Injectable } from '@angular/core';
import { delay, from, Observable, of, switchMap, throwError } from 'rxjs';
import { ProjectListItem } from '../projects/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  get(id: string): Observable<ProjectListItem> {
    return of({
      id: '1',
      name: 'Project 1',
    }).pipe(delay(500));
  }

  list(id: string): Observable<ProjectListItem[]> {
    return of([
      { id: '1', name: 'Project 1' },
      { id: '2', name: 'Project 2' },
      { id: '3', name: 'Project 3' },
      { id: '4', name: 'Project 4' },
      { id: '5', name: 'Project 5' },
    ])
      .pipe(delay(500))
      .pipe(delay(500));
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
