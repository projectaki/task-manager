import { Injectable } from '@angular/core';
import { delay, EMPTY, Observable, of } from 'rxjs';
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
      projects: [
        {
          id: '1',
          name: 'Project 1',
          role: ProjectRole.OWNER,
        },
        {
          id: '2',
          name: 'Project 2',
          role: ProjectRole.PARTICIPANT,
        },
        {
          id: '3',
          name: 'Project 3',
          role: ProjectRole.CLIENT,
        },
      ],
    } as User).pipe(delay(500));
  }
}
