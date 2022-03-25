import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { Project } from '../core/models/project.interface';
import { ProjectService } from '../core/services/project.service';

export interface ProjectViewState {
  project: Project | null;
  projectGetLoadingState: LoadingState;
  error: Error | null;
}

const initialState: ProjectViewState = {
  project: null,
  projectGetLoadingState: LoadingState.INITIAL,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class ProjectViewStoreService extends ComponentStore<ProjectViewState> {
  readonly project$: Observable<Project | null> = this.select(state => state.project);
  readonly getLoadingState$: Observable<LoadingState> = this.select(state => state.projectGetLoadingState);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);

  readonly vm$ = this.select(
    this.project$,
    this.getLoadingState$,
    this.errors$,

    (project, errors, getLoadingState) => ({
      project,
      getLoadingState,
      errors,
    })
  );
  constructor(private projectService: ProjectService) {
    super(initialState);
  }

  public readonly getProjectAsync = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      tap(() => this.patchState({ projectGetLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.projectService.get(id).pipe(tapResponse(this.onGetProjectTaskSuccess, this.onGetProjectTaskError))
      )
    );
  });

  private onGetProjectTaskSuccess = (project: Project) => {
    this.patchState({ project: project, projectGetLoadingState: LoadingState.LOADED });
  };

  private onGetProjectTaskError = (e: Error) => {
    this.patchState({ projectGetLoadingState: LoadingState.ERROR, error: e });
  };
}
