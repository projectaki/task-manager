import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of, shareReplay } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app.config';
import { ProjectListItem } from '../models/project-list-item.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = `${this.config.apiUrl}/api/users`;

  listOwnedProjects$ = this.http
    .get<ProjectListItem[]>(`${this.baseUrl}/projects/listOwnedProjects`)
    .pipe(shareReplay(1));

  listParticipantProjects$ = this.http
    .get<ProjectListItem[]>(`${this.baseUrl}/projects/listParticipantProjects`)
    .pipe(shareReplay(1));

  listClientProjects$ = this.http
    .get<ProjectListItem[]>(`${this.baseUrl}/projects/listClientProjects`)
    .pipe(shareReplay(1));
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
    return this.http.post<ProjectListItem>(`${this.baseUrl}/projects`, project);
  }

  updateProject(project: ProjectListItem): Observable<ProjectListItem> {
    return this.http.patch<ProjectListItem>(`${this.baseUrl}/projects/${project.id}`, project);
  }

  deleteProject(id: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`, { responseType: 'text' });
  }
}
