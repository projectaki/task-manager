import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { ProjectListItem } from '../core/models/project-list-item.interface';
import { UserService } from '../core/services/user.service';

export interface ProjectPageState {
  ownedProjects: ProjectListItem[];
  participantProjects: ProjectListItem[];
  clientProjects: ProjectListItem[];
  selectedProject: ProjectListItem | null;
  projectAddLoadingState: LoadingState;
  projectRemoveLoadingState: LoadingState;
  projectListOwnedLoadingState: LoadingState;
  projectListParticipantLoadingState: LoadingState;
  projectListClientLoadingState: LoadingState;
  projectUpdateLoadingState: LoadingState;
  error: Error | null;
}

const initialState: ProjectPageState = {
  ownedProjects: [],
  participantProjects: [],
  clientProjects: [],
  projectAddLoadingState: LoadingState.INITIAL,
  projectListOwnedLoadingState: LoadingState.INITIAL,
  projectRemoveLoadingState: LoadingState.INITIAL,
  projectListParticipantLoadingState: LoadingState.INITIAL,
  projectListClientLoadingState: LoadingState.INITIAL,
  projectUpdateLoadingState: LoadingState.INITIAL,
  selectedProject: null,
  error: null,
};

@Injectable()
export class ProjectPageStoreService extends ComponentStore<ProjectPageState> {
  readonly ownedProjects$: Observable<ProjectListItem[]> = this.select(state => state.ownedProjects);
  readonly participantProjects$: Observable<ProjectListItem[]> = this.select(state => state.participantProjects);
  readonly clientProjects$: Observable<ProjectListItem[]> = this.select(state => state.clientProjects);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);
  readonly addLoadingState$: Observable<LoadingState> = this.select(state => state.projectAddLoadingState);
  readonly listOwnedLoadingState$: Observable<LoadingState> = this.select(state => state.projectListOwnedLoadingState);
  readonly listParticipantLoadingState$: Observable<LoadingState> = this.select(
    state => state.projectListParticipantLoadingState
  );
  readonly listClientLoadingState$: Observable<LoadingState> = this.select(
    state => state.projectListClientLoadingState
  );
  readonly removeLoadingState$: Observable<LoadingState> = this.select(state => state.projectRemoveLoadingState);
  readonly updateLoadingState$: Observable<LoadingState> = this.select(state => state.projectUpdateLoadingState);
  readonly selectedProject$: Observable<ProjectListItem | null> = this.select(state => state.selectedProject);

  readonly vm$ = this.select(
    this.ownedProjects$,
    this.participantProjects$,
    this.clientProjects$,
    this.errors$,
    this.addLoadingState$,
    this.listOwnedLoadingState$,
    this.listParticipantLoadingState$,
    this.listClientLoadingState$,
    this.removeLoadingState$,
    this.updateLoadingState$,
    this.selectedProject$,
    (
      ownedProjects,
      participantProjects,
      clientProjects,
      errors,
      isAddLoading,
      isListOwnedLoading,
      isListParticipantLoading,
      isListClientLoading,
      isRemoveLoading,
      isUpdateLoading,
      selectedProject
    ) => ({
      ownedProjects,
      participantProjects,
      clientProjects,
      errors,
      isAddLoading,
      isListOwnedLoading,
      isListParticipantLoading,
      isListClientLoading,
      isRemoveLoading,
      isUpdateLoading,
      selectedProject,
    })
  );

  constructor(private userService: UserService) {
    super(initialState);
  }

  public readonly addProjectAsync = this.effect((project$: Observable<ProjectListItem>) => {
    return project$.pipe(
      tap(() => this.patchState({ projectAddLoadingState: LoadingState.LOADING })),
      switchMap(p =>
        this.userService.createProject(p).pipe(tapResponse(this.onProjectAddSuccess, this.onProjectAddError))
      )
    );
  });

  public readonly removeProjectAsync = this.effect((projectId$: Observable<string>) => {
    return projectId$.pipe(
      tap(() => this.patchState({ projectRemoveLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.userService.deleteProject(id).pipe(tapResponse(this.onRemoveProjectSuccess, this.onRemoveProjectError))
      )
    );
  });

  public readonly listOwnedProjectsAsync = this.effect((void$: Observable<void>) => {
    return void$.pipe(
      tap(() => this.patchState({ projectListOwnedLoadingState: LoadingState.LOADING })),
      switchMap(() =>
        this.userService.listOwnedProjects$.pipe(
          tapResponse(this.onListOwnedProjectSuccess, this.onListOwnedProjectError)
        )
      )
    );
  });

  public readonly listParticipantProjectsAsync = this.effect((void$: Observable<void>) => {
    return void$.pipe(
      tap(() => this.patchState({ projectListParticipantLoadingState: LoadingState.LOADING })),
      switchMap(() =>
        this.userService.listParticipantProjects$.pipe(
          tapResponse(this.onListParticipantProjectSuccess, this.onListParticipantProjectError)
        )
      )
    );
  });

  public readonly listClientProjectsAsync = this.effect((void$: Observable<void>) => {
    return void$.pipe(
      tap(() => this.patchState({ projectListClientLoadingState: LoadingState.LOADING })),
      switchMap(() =>
        this.userService.listClientProjects$.pipe(
          tapResponse(this.onListClientProjectSuccess, this.onListClientProjectError)
        )
      )
    );
  });

  public readonly updateProjectAsync = this.effect((project$: Observable<ProjectListItem>) => {
    return project$.pipe(
      tap(() => this.patchState({ projectUpdateLoadingState: LoadingState.LOADING })),
      switchMap(p =>
        this.userService.updateProject(p).pipe(tapResponse(this.onUpdateProjectSuccess, this.onUpdateProjectError))
      )
    );
  });

  public readonly selectProject = this.updater((state, id: string) => ({
    ...state,
    selectedProject: [...state.ownedProjects, ...state.participantProjects, ...state.clientProjects].find(
      x => x.id === id
    )!,
  }));

  private onProjectAddSuccess = (project: ProjectListItem) => {
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

  private onListOwnedProjectSuccess = (ownedProjects: ProjectListItem[]) => {
    this.patchState({ ownedProjects, projectListOwnedLoadingState: LoadingState.LOADED });
  };

  private onListOwnedProjectError = (e: Error) => {
    this.patchState({ projectListOwnedLoadingState: LoadingState.ERROR, error: e });
  };

  private onListParticipantProjectSuccess = (participantProjects: ProjectListItem[]) => {
    this.patchState({ participantProjects, projectListParticipantLoadingState: LoadingState.LOADED });
  };

  private onListParticipantProjectError = (e: Error) => {
    this.patchState({ projectListParticipantLoadingState: LoadingState.ERROR, error: e });
  };

  private onListClientProjectSuccess = (clientProjects: ProjectListItem[]) => {
    this.patchState({ clientProjects, projectListClientLoadingState: LoadingState.LOADED });
  };

  private onListClientProjectError = (e: Error) => {
    this.patchState({ projectListClientLoadingState: LoadingState.ERROR, error: e });
  };

  private onUpdateProjectSuccess = (project: ProjectListItem) => {
    this.updateProject(project);
    this.patchState({ projectUpdateLoadingState: LoadingState.LOADED });
  };

  private onUpdateProjectError = (e: Error) => {
    this.patchState({ projectUpdateLoadingState: LoadingState.ERROR, error: e });
  };

  private readonly addProject = this.updater((state, project: ProjectListItem) => ({
    ...state,
    ownedProjects: [...state.ownedProjects, project],
  }));

  private readonly updateProject = this.updater((state, project: ProjectListItem) => {
    const index = state.ownedProjects.findIndex(x => x.id === project.id);
    return {
      ...state,
      ownedProjects: [...state.ownedProjects.slice(0, index), project, ...state.ownedProjects.slice(index + 1)],
    };
  });

  private readonly deleteProject = this.updater((state, id: string) => ({
    ...state,
    ownedProjects: state.ownedProjects.filter(x => x.id !== id),
  }));
}
