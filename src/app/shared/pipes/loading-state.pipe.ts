import { Pipe, PipeTransform } from '@angular/core';
import { LoadingState } from 'src/app/core/enums/loading-state.enum';

@Pipe({
  name: 'loadingState',
})
export class LoadingStatePipe implements PipeTransform {
  transform(value: LoadingState, ...args: string[]): boolean {
    return value === LoadingState.LOADING;
  }
}
