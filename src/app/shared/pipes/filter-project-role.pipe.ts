import { Pipe, PipeTransform } from '@angular/core';
import { ProjectUser } from 'src/app/core/models/project-user.interface';
import { ProjectRole } from '../../core/enums/project-role.enum';

@Pipe({
  name: 'filterProjectRole',
})
export class FilterProjectRolePipe implements PipeTransform {
  transform<T extends ProjectUser>(value: T[], arg: ProjectRole): T[] {
    return value.filter(x => x.role === arg);
  }
}
