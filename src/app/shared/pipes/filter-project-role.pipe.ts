import { Pipe, PipeTransform } from '@angular/core';
import { ProjectListItem } from '../../core/models/project-list-item.interface';
import { ProjectRole } from '../../core/enums/project-role.enum';
import { ProjectUser } from 'src/app/core/models/project-user.interface';

@Pipe({
  name: 'filterProjectRole',
})
export class FilterProjectRolePipe implements PipeTransform {
  transform(value: ProjectListItem[] | ProjectUser[], arg: ProjectRole): any[] {
    return value.filter(x => x.role === arg);
  }
}
