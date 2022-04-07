import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of, shareReplay } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectListItem } from '../models/project-list-item.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = `${this.config.apiUrl}/api/users`;

  listOwnedProjects$ = this.http
    .get<ProjectListItem[]>(`${this.baseUrl}/${this.auth.sub}/listOwnedProjects`)
    .pipe(shareReplay(1));

  listParticipantProjects$ = this.http
    .get<ProjectListItem[]>(`${this.baseUrl}/${this.auth.sub}/listParticipantProjects`)
    .pipe(shareReplay(1));

  listClientProjects$ = this.http
    .get<ProjectListItem[]>(`${this.baseUrl}/${this.auth.sub}/listClientProjects`)
    .pipe(shareReplay(1));
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig, private auth: AuthService) {}

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create() {}
  update() {}

  createProject(project: ProjectListItem): Observable<ProjectListItem> {
    return this.http.post<ProjectListItem>(`${this.baseUrl}/${this.auth.sub}/projects`, project);
  }

  updateProject(project: ProjectListItem): Observable<ProjectListItem> {
    return this.http.patch<ProjectListItem>(`${this.baseUrl}/${this.auth.sub}/projects/${project.id}`, project);
  }

  deleteProject(id: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${this.auth.sub}/projects/${id}`, { responseType: 'text' });
  }
}
