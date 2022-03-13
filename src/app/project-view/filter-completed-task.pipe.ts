import { Pipe, PipeTransform } from '@angular/core';
import { ProjectTaskItem } from '../core/models/project-task-item.interface';

@Pipe({
  name: 'filterCompletedTask',
})
export class FilterCompletedTaskPipe implements PipeTransform {
  transform(value: ProjectTaskItem[], ...args: boolean[]): ProjectTaskItem[] {
    return value.filter(x => x.completed === args[0]);
  }
}
