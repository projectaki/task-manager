import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MemberCreate } from 'src/app/members/member-create';
import { ProjectRole } from '../enums/project-role.enum';
import { ProjectUser } from '../models/project-user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectMemberService {
  constructor() {}

  add(memberCreate: MemberCreate): Observable<ProjectUser> {
    return of(<ProjectUser>{
      id: '1',
      accepted: false,
      company: 'Test',
      email: memberCreate.email,
      name: memberCreate.email,
      role: memberCreate.role,
    }).pipe(delay(500));
  }

  delete(projectId: string, memberId: string): Observable<string> {
    return of(memberId).pipe(delay(500));
  }

  list(projectId: string): Observable<ProjectUser[]> {
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
