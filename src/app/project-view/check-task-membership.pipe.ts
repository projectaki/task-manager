import { Pipe, PipeTransform } from '@angular/core';
import { ProjectRole } from '../core/enums/project-role.enum';
import { ProjectUser } from '../core/models/project-user.interface';

@Pipe({
  name: 'checkTaskMembership',
})
export class CheckTaskMembershipPipe implements PipeTransform {
  transform(projectUsers: ProjectUser[], ...args: string[]): boolean {
    return projectUsers
      .filter(x => x.role === ProjectRole.OWNER)
      .map(x => x.id)
      .includes(args[0]);
  }
}
