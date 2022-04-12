import { Pipe, PipeTransform } from '@angular/core';
import { ProjectMember } from 'src/app/members/project-member.dto';

@Pipe({
  name: 'checkTaskMembership',
})
export class CheckTaskMembershipPipe implements PipeTransform {
  transform(members: ProjectMember[] | undefined, ...args: any[]): boolean {
    const [sub, checkFor] = args;

    return (
      members
        ?.filter(x => x.role === checkFor)
        .map(x => x.user)
        .includes(sub) ?? false
    );
  }
}
