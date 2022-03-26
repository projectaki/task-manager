import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app.config';
import { ProjectListItem } from '../models/project-list-item.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  get(): Observable<User> {
    return of({
      id: '1',
      email: 'user@user.com',
    } as User).pipe(delay(500));
  }

  create() {}
  update() {}

  createProject(project: ProjectListItem): Observable<ProjectListItem> {
    return this.http.post<ProjectListItem>(`${this.config.apiUrl}/api/projects`, project);
  }

  updateProject(project: ProjectListItem): Observable<ProjectListItem> {
    return this.http.patch<ProjectListItem>(`${this.config.apiUrl}/api/projects/${project.id}`, project);
  }

  deleteProject(id: string): Observable<string> {
    return this.http.delete(`${this.config.apiUrl}/api/projects/${id}`, { responseType: 'text' });
  }

  // listOwnedProjects = (userId: string): Observable<ProjectListItem[]> => {
  //   let listOwnedProjects$: Observable<ProjectListItem[]> | null = null;

  //   return (() => {
  //     console.log(listOwnedProjects$);
  //     if (!listOwnedProjects$)
  //       listOwnedProjects$ = this.http.get<ProjectListItem[]>(
  //         `${this.config.apiUrl}/api/users/${userId}/projects/listOwnedProjects`
  //       );

  //     return listOwnedProjects$;
  //   })();
  // };

  listOwnedProjects(userId: string) {
    return this.http.get<ProjectListItem[]>(`${this.config.apiUrl}/api/users/${userId}/projects/listOwnedProjects`);
  }

  listParticipantProjects(userId: string): Observable<ProjectListItem[]> {
    return this.http.get<ProjectListItem[]>(
      `${this.config.apiUrl}/api/users/${userId}/projects/listParticipantProjects`
    );
  }

  listClientProjects(userId: string): Observable<ProjectListItem[]> {
    return this.http.get<ProjectListItem[]>(`${this.config.apiUrl}/api/users/${userId}/projects/listClientProjects`);
  }
}
