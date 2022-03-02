import { Pipe, PipeTransform } from '@angular/core';
import { ProjectListItem } from './project-list-item.interface';
import { ProjectType } from './project-type.enum';

@Pipe({
  name: 'filterProject',
})
export class FilterProjectPipe implements PipeTransform {
  transform(value: ProjectListItem[], arg: ProjectType): ProjectListItem[] {
    return value.filter(x => x.projectType === arg);
  }
}
