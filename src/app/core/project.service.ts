import { Injectable } from '@angular/core';
import { delay, from, Observable, of, throwError } from 'rxjs';
import { Project } from '../projects/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  get(id: string): Observable<Project> {
    return of({
      id: '1',
      name: 'Project 1',
      description: 'This is a test project',
    });
  }

  list(id: string): Observable<Project[]> {
    return of([
      { id: '1', name: 'Project 1', description: 'This is a test project' },
      { id: '2', name: 'Project 2', description: 'This is a test project' },
      { id: '3', name: 'Project 3', description: 'This is a test project' },
      { id: '4', name: 'Project 4', description: 'This is a test project' },
      { id: '5', name: 'Project 5', description: 'This is a test project' },
    ]).pipe(delay(500));
  }

  add(project: Project): Observable<Project> {
    //return throwError(() => new Error('erropr'));
    return of(project).pipe(delay(500));
  }

  update(project: Project): Observable<string> {
    return of(project.id);
  }

  delete(id: string): Observable<string> {
    return of(id);
  }
}
