import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatMap, Observable, tap } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { ProjectTaskItem } from '../core/models/project-task-item.interface';
import { TaskService } from '../core/services/task.service';

export interface TaskViewState {
  taskView: ProjectTaskItem | null;
  taskViewUpdateLoadingState: LoadingState;
  error: Error | null;
}

const initialState: TaskViewState = {
  error: null,
  taskViewUpdateLoadingState: LoadingState.INITIAL,
  taskView: null,
};

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService extends ComponentStore<TaskViewState> {
  readonly taskView$: Observable<ProjectTaskItem | null> = this.select(state => state.taskView);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);
  readonly taskViewUpdateLoadingState$: Observable<LoadingState> = this.select(
    state => state.taskViewUpdateLoadingState
  );

  readonly vm$ = this.select(
    this.taskView$,
    this.errors$,
    this.taskViewUpdateLoadingState$,

    (taskView, errors, isUpdateLoading) => ({
      taskView,
      errors,
      isUpdateLoading,
    })
  );
  constructor(private taskService: TaskService) {
    super(initialState);
  }

  public readonly updateTaskViewAsync = this.effect((task$: Observable<{ taskView: ProjectTaskItem; id: string }>) => {
    return task$.pipe(
      tap(() => this.patchState({ taskViewUpdateLoadingState: LoadingState.LOADING })),
      concatMap(({ id, taskView }) =>
        this.taskService
          .update(id, taskView)
          .pipe(tapResponse(this.onUpdateProjectTaskSuccess, this.onUpdateProjectTaskError))
      )
    );
  });

  public readonly getProjectTasksAsync = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      tap(() => this.patchState({ taskViewUpdateLoadingState: LoadingState.LOADING })),
      concatMap(id =>
        this.taskService.get(id).pipe(tapResponse(this.onGetProjectTaskSuccess, this.onGetProjectTaskError))
      )
    );
  });

  private onUpdateProjectTaskSuccess = (project: ProjectTaskItem) => {
    this.updateProjectTask(project);
    this.patchState({ taskViewUpdateLoadingState: LoadingState.LOADED });
  };

  private onUpdateProjectTaskError = (e: Error) => {
    this.patchState({ taskViewUpdateLoadingState: LoadingState.ERROR, error: e });
  };

  private readonly updateProjectTask = this.updater((state, project: ProjectTaskItem) => {
    return {
      ...state,
      taskView: project,
    };
  });

  private onGetProjectTaskSuccess = (project: ProjectTaskItem) => {
    this.patchState({ taskView: project, taskViewUpdateLoadingState: LoadingState.LOADED });
  };

  private onGetProjectTaskError = (e: Error) => {
    this.patchState({ taskViewUpdateLoadingState: LoadingState.ERROR, error: e });
  };
}
