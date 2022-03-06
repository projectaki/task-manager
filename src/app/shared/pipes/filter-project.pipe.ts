import { Pipe, PipeTransform } from '@angular/core';
import { ProjectListItem } from '../../core/models/project-list-item.interface';
import { ProjectType } from '../../core/enums/project-type.enum';

@Pipe({
  name: 'filterProject',
})
export class FilterProjectPipe implements PipeTransform {
  transform(value: ProjectListItem[], arg: ProjectType): ProjectListItem[] {
    return value.filter(x => x.projectType === arg);
  }
}
