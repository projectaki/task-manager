import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { ProjectRole } from '../core/enums/project-role.enum';
import { ProjectUser } from '../core/models/project-user.interface';
import { ProjectService } from '../core/services/project.service';

export interface ProjectViewState {
  //projectId: string | null;
  projectUsers: ProjectUser[];
  selectedProjectUser: ProjectUser | null;
  projectUserInviteLoadingState: LoadingState;
  projectUserRemoveLoadingState: LoadingState;
  projectUserListLoadingState: LoadingState;
  error: Error | null;
}

const initialState: ProjectViewState = {
  // projectId: null,
  error: null,
  projectUserInviteLoadingState: LoadingState.INITIAL,
  projectUserRemoveLoadingState: LoadingState.INITIAL,
  projectUserListLoadingState: LoadingState.INITIAL,
  projectUsers: [],
  selectedProjectUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class ProjectViewStoreService extends ComponentStore<ProjectViewState> {
  readonly projectUsers$: Observable<ProjectUser[]> = this.select(state => state.projectUsers);
  //readonly projectId$: Observable<string | null> = this.select(state => state.projectId);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);
  readonly projectUserInviteLoadingState$: Observable<LoadingState> = this.select(
    state => state.projectUserInviteLoadingState
  );
  readonly projectUserRemoveLoadingState$: Observable<LoadingState> = this.select(
    state => state.projectUserRemoveLoadingState
  );
  readonly projectUserListLoadingState$: Observable<LoadingState> = this.select(
    state => state.projectUserListLoadingState
  );
  readonly selectedProjectUser$: Observable<ProjectUser | null> = this.select(state => state.selectedProjectUser);

  readonly vm$ = this.select(
    this.projectUsers$,
    this.errors$,
    this.projectUserInviteLoadingState$,
    this.projectUserRemoveLoadingState$,
    this.projectUserListLoadingState$,
    this.selectedProjectUser$,
    //this.projectId$,
    (
      projectUsers,
      errors,
      projectUserInviteLoadingState,
      projectUserRemoveLoadingState,
      projectUserListLoadingState,
      selectedProjectUser
      //projectId
    ) => ({
      projectUsers,
      errors,
      projectUserInviteLoadingState,
      projectUserRemoveLoadingState,
      projectUserListLoadingState,
      selectedProjectUser,
      //projectId,
    })
  );

  constructor(private projectService: ProjectService) {
    super(initialState);
  }

  public readonly inviteProjectUserAsync = this.effect(
    (project$: Observable<{ email: string; role: ProjectRole; id: string }>) => {
      return project$.pipe(
        tap(() => this.patchState({ projectUserInviteLoadingState: LoadingState.LOADING })),

        switchMap(({ email, id, role }) =>
          this.projectService
            .addProjectUser(id!, email, role)
            .pipe(tapResponse(this.onProjectUserInviteSuccess, this.onProjectUserInviteError))
        )
      );
    }
  );

  public readonly removeProjectUserAsync = this.effect((project$: Observable<{ userId: string; id: string }>) => {
    return project$.pipe(
      tap(() => this.patchState({ projectUserRemoveLoadingState: LoadingState.LOADING })),

      switchMap(({ userId, id }) =>
        this.projectService
          .removeProjectUser(id!, userId)
          .pipe(tapResponse(this.onRemoveProjectUserSuccess, this.onRemoveProjectUserError))
      )
    );
  });

  public readonly listProjectUsersAsync = this.effect((projectId$: Observable<string>) => {
    return projectId$.pipe(
      tap(() => this.patchState({ projectUserListLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.projectService
          .listProjectUsers(id)
          .pipe(tapResponse(this.onListProjectUserSuccess, this.onListProjectUserError))
      )
    );
  });

  public readonly selectProjectUser = this.updater((state, id: string) => ({
    ...state,
    selectedProjectUser: { ...state.projectUsers.find(x => x.id === id)! },
  }));

  private onProjectUserInviteSuccess = (project: ProjectUser) => {
    this.addProjectUser(project);
    this.patchState({ projectUserInviteLoadingState: LoadingState.LOADED });
  };

  private onProjectUserInviteError = (e: Error) => {
    this.patchState({ projectUserInviteLoadingState: LoadingState.ERROR, error: e });
  };

  private onRemoveProjectUserSuccess = (id: string) => {
    this.deleteProjectUser(id);
    this.patchState({ projectUserRemoveLoadingState: LoadingState.LOADED });
  };

  private onRemoveProjectUserError = (e: Error) => {
    this.patchState({ projectUserRemoveLoadingState: LoadingState.ERROR, error: e });
  };

  private onListProjectUserSuccess = (projectUsers: ProjectUser[]) => {
    this.patchState({ projectUsers, projectUserListLoadingState: LoadingState.LOADED });
  };

  private onListProjectUserError = (e: Error) => {
    this.patchState({ projectUserListLoadingState: LoadingState.ERROR, error: e });
  };

  private readonly addProjectUser = this.updater((state, projectUser: ProjectUser) => ({
    ...state,
    projectUsers: [...state.projectUsers, projectUser],
  }));

  private readonly deleteProjectUser = this.updater((state, id: string) => ({
    ...state,
    projectUsers: state.projectUsers.filter(x => x.id !== id),
  }));
}