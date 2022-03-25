import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MemberCreate } from 'src/app/members/member-create';
import { ProjectRole } from '../enums/project-role.enum';
import { TaskTag } from '../enums/task-tag.enum';
import { ProjectTaskItem } from '../models/project-task-item.interface';
import { ProjectUser } from '../models/project-user.interface';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  get(id: string): Observable<Project> {
    return of({
      id,
      name: 'Project' + id,
      ownerIds: ['auth0|622e71a6d36bbb0069373531'],
      clientIds: [],
      participantIds: [],
    } as Project).pipe(delay(500));
  }

  createTask(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return of({ ...task, completed: false }).pipe(delay(500));
  }

  updateTask(projectId: string, task: ProjectTaskItem): Observable<ProjectTaskItem> {
    return of({ ...task, completed: true }).pipe(delay(500));
  }

  deleteTask(projectId: string, taskId: string): Observable<string> {
    return of(taskId).pipe(delay(500));
  }

  listTasks(projectId: string): Observable<ProjectTaskItem[]> {
    return of([
      {
        id: '1',
        title: 'Task 1',
        completed: false,
        tag: TaskTag.BUG,
      },
      {
        id: '2',
        title: 'Task 2',
        completed: false,
        tag: TaskTag.FEATURE,
      },
      {
        id: '3',
        title: 'Task 3',
        completed: true,
        tag: TaskTag.BUG,
      },
    ]).pipe(delay(500));
  }

  inviteUser(memberCreate: MemberCreate): Observable<ProjectUser> {
    return of(<ProjectUser>{
      id: '1',
      accepted: false,
      company: 'Test',
      email: memberCreate.email,
      name: memberCreate.email,
      role: memberCreate.role,
    }).pipe(delay(500));
  }
  uninviteUser(projectId: string, memberId: string): Observable<string> {
    return of(memberId).pipe(delay(500));
  }
  listUsers(projectId: string): Observable<ProjectUser[]> {
    return of([
      {
        id: 'auth0|622e71a6d36bbb0069373531',
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
