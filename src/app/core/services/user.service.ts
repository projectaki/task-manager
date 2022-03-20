import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  get(id: string): Observable<User> {
    return EMPTY;
    // return of({
    //   id: '1',
    //   name: 'Project 1',
    //   projectUsers: [
    //     {
    //       id: '1',
    //       accepted: true,
    //       role: ProjectRole.OWNER,
    //     },
    //     {
    //       id: '2',
    //       accepted: false,
    //       role: ProjectRole.PARTICIPANT,
    //     },
    //     {
    //       id: '3',
    //       accepted: true,
    //       role: ProjectRole.CLIENT,
    //     },
    //   ],
    // } as Project).pipe(delay(500));
  }
}
