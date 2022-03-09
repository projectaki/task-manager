import { Pipe, PipeTransform } from '@angular/core';
import { ProjectUser } from '../core/models/project-user.interface';
import { Member } from '../members/member';

@Pipe({
  name: 'projectuserToMember',
})
export class ProjectuserToMemberPipe implements PipeTransform {
  transform(value: ProjectUser[], ...args: unknown[]): Member[] {
    return value.map(
      ({ id, name, email, company, accepted }) =>
        <Member>{
          id,
          name,
          email,
          company,
          accepted,
        }
    );
  }
}
