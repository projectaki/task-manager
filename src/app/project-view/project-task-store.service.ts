import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { ProjectTaskItem } from '../core/models/project-task-item.interface';
import { ProjectService } from '../core/services/project.service';

export interface ProjectTaskState {
  projectTasks: ProjectTaskItem[];
  selectedProjectTask: ProjectTaskItem | null;
  projectTaskAddLoadingState: LoadingState;
  projectTaskRemoveLoadingState: LoadingState;
  projectTaskListLoadingState: LoadingState;
  projectTaskUpdateLoadingState: LoadingState;
  error: Error | null;
}

const initialState: ProjectTaskState = {
  error: null,
  projectTaskAddLoadingState: LoadingState.INITIAL,
  projectTaskListLoadingState: LoadingState.INITIAL,
  projectTaskRemoveLoadingState: LoadingState.INITIAL,
  projectTaskUpdateLoadingState: LoadingState.INITIAL,
  projectTasks: [],
  selectedProjectTask: null,
};

@Injectable({
  providedIn: 'root',
})
export class ProjectTaskStoreService extends ComponentStore<ProjectTaskState> {
  readonly projectTasks$: Observable<ProjectTaskItem[]> = this.select(state => state.projectTasks);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);
  readonly addLoadingState$: Observable<LoadingState> = this.select(state => state.projectTaskAddLoadingState);
  readonly listLoadingState$: Observable<LoadingState> = this.select(state => state.projectTaskListLoadingState);
  readonly removeLoadingState$: Observable<LoadingState> = this.select(state => state.projectTaskRemoveLoadingState);
  readonly updateLoadingState$: Observable<LoadingState> = this.select(state => state.projectTaskUpdateLoadingState);
  readonly selectedProject$: Observable<ProjectTaskItem | null> = this.select(state => state.selectedProjectTask);

  readonly vm$ = this.select(
    this.projectTasks$,
    this.errors$,
    this.addLoadingState$,
    this.listLoadingState$,
    this.removeLoadingState$,
    this.updateLoadingState$,
    this.selectedProject$,
    (projectTasks, errors, isAddLoading, isListLoading, isRemoveLoading, isUpdateLoading, selectedProject) => ({
      projectTasks,
      errors,
      isAddLoading,
      isListLoading,
      isRemoveLoading,
      isUpdateLoading,
      selectedProject,
    })
  );

  constructor(private projectService: ProjectService) {
    super(initialState);
  }

  public readonly addProjectTaskAsync = this.effect(
    (projectTask$: Observable<{ projectTaskItem: ProjectTaskItem; id: string }>) => {
      return projectTask$.pipe(
        tap(() => this.patchState({ projectTaskAddLoadingState: LoadingState.LOADING })),
        switchMap(({ id, projectTaskItem }) =>
          this.projectService
            .addProjectTask(id, projectTaskItem)
            .pipe(tapResponse(this.onProjectTaskAddSuccess, this.onProjectTaskAddError))
        )
      );
    }
  );

  public readonly removeProjectTaskAsync = this.effect(
    (projectTaskId$: Observable<{ projectTaskId: string; id: string }>) => {
      return projectTaskId$.pipe(
        tap(() => this.patchState({ projectTaskRemoveLoadingState: LoadingState.LOADING })),
        switchMap(({ id, projectTaskId }) =>
          this.projectService
            .removeProjectTask(id, projectTaskId)
            .pipe(tapResponse(this.onRemoveProjectTaskSuccess, this.onRemoveProjectTaskError))
        )
      );
    }
  );

  public readonly listProjectTasksAsync = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      tap(() => this.patchState({ projectTaskListLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.projectService
          .listProjectTasks(id)
          .pipe(tapResponse(this.onListProjectTaskSuccess, this.onListProjectTaskError))
      )
    );
  });

  public readonly updateProjectTaskAsync = this.effect(
    (project$: Observable<{ projectTaskItem: ProjectTaskItem; id: string }>) => {
      return project$.pipe(
        tap(() => this.patchState({ projectTaskUpdateLoadingState: LoadingState.LOADING })),
        switchMap(({ id, projectTaskItem }) =>
          this.projectService
            .updateProjectTask(id, projectTaskItem)
            .pipe(tapResponse(this.onUpdateProjectTaskSuccess, this.onUpdateProjectTaskError))
        )
      );
    }
  );

  public readonly selectProjectTask = this.updater((state, id: string) => ({
    ...state,
    selectedProjectTask: { ...state.projectTasks.find(x => x.id === id)! },
  }));

  private onProjectTaskAddSuccess = (project: ProjectTaskItem) => {
    this.addProjectTask(project);
    this.patchState({ projectTaskAddLoadingState: LoadingState.LOADED });
  };

  private onProjectTaskAddError = (e: Error) => {
    this.patchState({ projectTaskAddLoadingState: LoadingState.ERROR, error: e });
  };

  private onRemoveProjectTaskSuccess = (id: string) => {
    this.deleteProjectTask(id);
    this.patchState({ projectTaskRemoveLoadingState: LoadingState.LOADED });
  };

  private onRemoveProjectTaskError = (e: Error) => {
    this.patchState({ projectTaskRemoveLoadingState: LoadingState.ERROR, error: e });
  };

  private onListProjectTaskSuccess = (projects: ProjectTaskItem[]) => {
    this.patchState({ projectTasks: projects, projectTaskListLoadingState: LoadingState.LOADED });
  };

  private onListProjectTaskError = (e: Error) => {
    this.patchState({ projectTaskListLoadingState: LoadingState.ERROR, error: e });
  };

  private onUpdateProjectTaskSuccess = (project: ProjectTaskItem) => {
    this.updateProjectTask(project);
    this.patchState({ projectTaskUpdateLoadingState: LoadingState.LOADED });
  };

  private onUpdateProjectTaskError = (e: Error) => {
    this.patchState({ projectTaskUpdateLoadingState: LoadingState.ERROR, error: e });
  };

  private readonly addProjectTask = this.updater((state, project: ProjectTaskItem) => ({
    ...state,
    projectTasks: [...state.projectTasks, project],
  }));

  private readonly updateProjectTask = this.updater((state, project: ProjectTaskItem) => {
    const index = state.projectTasks.findIndex(x => x.id === project.id);
    return {
      ...state,
      projectTasks: [...state.projectTasks.slice(0, index), project, ...state.projectTasks.slice(index + 1)],
    };
  });

  private readonly deleteProjectTask = this.updater((state, id: string) => ({
    ...state,
    projectTasks: state.projectTasks.filter(x => x.id !== id),
  }));
}
