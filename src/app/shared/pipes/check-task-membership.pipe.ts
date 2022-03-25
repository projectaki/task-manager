import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkTaskMembership',
})
export class CheckTaskMembershipPipe implements PipeTransform {
  transform(userIds: string[] | undefined, ...args: string[]): boolean {
    return userIds?.includes(args[0]) ?? false;
  }
}
