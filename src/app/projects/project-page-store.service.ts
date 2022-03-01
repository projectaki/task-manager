import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BehaviorSubject, catchError, EMPTY, Observable, Subject, switchMap, tap } from 'rxjs';
import { LoadingState } from '../core/models/loading-state.enum';
import { ProjectService } from '../core/project.service';
import { Project } from './project.interface';

export interface ProjectPageState {
  projects: Project[];
  selectedProject: Project | null;
  projectAddLoadingState: LoadingState;
  projectRemoveLoadingState: LoadingState;
  projectListLoadingState: LoadingState;
  projectUpdateLoadingState: LoadingState;
  error: Error | null;
}

const initialState: ProjectPageState = {
  error: null,
  projectAddLoadingState: LoadingState.INITIAL,
  projectListLoadingState: LoadingState.INITIAL,
  projectRemoveLoadingState: LoadingState.INITIAL,
  projectUpdateLoadingState: LoadingState.INITIAL,
  projects: [],
  selectedProject: null,
};

@Injectable()
export class ProjectPageStoreService extends ComponentStore<ProjectPageState> {
  readonly projects$: Observable<Project[]> = this.select(state => state.projects);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);
  readonly addLoadingState$: Observable<LoadingState> = this.select(state => state.projectAddLoadingState);
  readonly listLoadingState$: Observable<LoadingState> = this.select(state => state.projectListLoadingState);
  readonly removeLoadingState$: Observable<LoadingState> = this.select(state => state.projectRemoveLoadingState);
  readonly updateLoadingState$: Observable<LoadingState> = this.select(state => state.projectUpdateLoadingState);
  readonly selectedProject$: Observable<Project | null> = this.select(state => state.selectedProject);

  readonly vm$ = this.select(
    this.projects$,
    this.errors$,
    this.addLoadingState$,
    this.listLoadingState$,
    this.removeLoadingState$,
    this.updateLoadingState$,
    this.selectedProject$,
    (projects, errors, isAddLoading, isListLoading, isRemoveLoading, isUpdateLoading, selectedProject) => ({
      projects,
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

  readonly addProjectAsync = this.effect((project$: Observable<Project>) => {
    return project$.pipe(
      tap(() => this.patchState({ projectAddLoadingState: LoadingState.LOADING })),
      switchMap(p => this.projectService.add(p).pipe(tapResponse(this.onProjectAddSuccess, this.onProjectAddError)))
    );
  });

  readonly removeProjectAsync = this.effect((projectId$: Observable<string>) => {
    return projectId$.pipe(
      tap(() => this.patchState({ projectRemoveLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.projectService.delete(id).pipe(tapResponse(this.onRemoveProjectSuccess, this.onRemoveProjectError))
      )
    );
  });

  readonly listProjectsAsync = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      tap(() => this.patchState({ projectListLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.projectService.list(id).pipe(tapResponse(this.onListProjectSuccess, this.onListProjectError))
      )
    );
  });

  readonly updateProjectAsync = this.effect((project$: Observable<Project>) => {
    return project$.pipe(
      tap(() => this.patchState({ projectUpdateLoadingState: LoadingState.LOADING })),
      switchMap(p =>
        this.projectService.update(p).pipe(tapResponse(this.onUpdateProjectSuccess, this.onUpdateProjectError))
      )
    );
  });

  public readonly selectProject = this.updater((state, id: string) => ({
    ...state,
    selectedProject: { ...state.projects.find(x => x.id === id)! },
  }));

  private readonly addProject = this.updater((state, project: Project) => ({
    ...state,
    projects: [...state.projects, project],
  }));

  private readonly updateProject = this.updater((state, project: Project) => {
    const index = state.projects.findIndex(x => x.id === project.id);
    return {
      ...state,
      projects: [...state.projects.slice(0, index), project, ...state.projects.slice(index + 1)],
    };
  });

  private readonly deleteProject = this.updater((state, id: string) => ({
    ...state,
    projects: state.projects.filter(x => x.id !== id),
  }));

  private onProjectAddSuccess = (project: Project) => {
    this.addProject(project);
    this.patchState({ projectAddLoadingState: LoadingState.LOADED });
  };

  private onProjectAddError = (e: Error) => {
    this.patchState({ projectAddLoadingState: LoadingState.ERROR, error: e });
  };

  private onRemoveProjectSuccess = (id: string) => {
    this.deleteProject(id);
    this.patchState({ projectRemoveLoadingState: LoadingState.LOADED });
  };

  private onRemoveProjectError = (e: Error) => {
    this.patchState({ projectRemoveLoadingState: LoadingState.ERROR, error: e });
  };

  private onListProjectSuccess = (projects: Project[]) => {
    this.patchState({ projects, projectListLoadingState: LoadingState.LOADED });
  };

  private onListProjectError = (e: Error) => {
    this.patchState({ projectListLoadingState: LoadingState.ERROR, error: e });
  };

  private onUpdateProjectSuccess = (project: Project) => {
    this.updateProject(project);
    this.patchState({ projectUpdateLoadingState: LoadingState.LOADED });
  };

  private onUpdateProjectError = (e: Error) => {
    this.patchState({ projectUpdateLoadingState: LoadingState.ERROR, error: e });
  };
}
