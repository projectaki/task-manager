import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app.config';
import { MemberCreate } from 'src/app/members/member-create';
import { ProjectTaskItem } from '../models/project-task-item.interface';
import { ProjectUser } from '../models/project-user.interface';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string = `${this.config.apiUrl}/api/projects`;
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  get(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  getTask(projectId: string, taskId: string): Observable<ProjectTaskItem> {
    return this.http.get<ProjectTaskItem>(`${this.baseUrl}/${projectId}/tasks/${taskId}`);
  }

  createTask(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return this.http.post<ProjectTaskItem>(`${this.baseUrl}/${projectId}/tasks`, task);
  }

  updateTask(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return this.http.patch<ProjectTaskItem>(`${this.baseUrl}/${projectId}/tasks/${task.id}`, task);
  }

  deleteTask(projectId: string, taskId: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${projectId}/tasks/${taskId}`, { responseType: 'text' });
  }

  listTasks(projectId: string): Observable<ProjectTaskItem[]> {
    return this.http.get<ProjectTaskItem[]>(`${this.baseUrl}/${projectId}/tasks`);
  }

  inviteUser(memberCreate: MemberCreate): Observable<ProjectUser> {
    return this.http.post<ProjectUser>(`${this.baseUrl}/${memberCreate.projectId}/users`, memberCreate);
  }

  uninviteUser(projectId: string, memberId: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${projectId}/users/${memberId}`, { responseType: 'text' });
  }

  listUsers(projectId: string): Observable<ProjectUser[]> {
    return this.http.get<ProjectUser[]>(`${this.baseUrl}/${projectId}/members/listInvitedUsers`);
  }
}
