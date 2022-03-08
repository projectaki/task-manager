// import { Injectable } from '@angular/core';
// import { ComponentStore } from '@ngrx/component-store';
// import { ProjectUser } from '../core/models/project-user.interface';

// export interface ProjectViewState {
//   projectUsers: ProjectUser[];
//   selectedProjectUser: ProjectUser | null;
//   projectAddLoadingState: LoadingState;
//   projectRemoveLoadingState: LoadingState;
//   projectListLoadingState: LoadingState;
//   projectUpdateLoadingState: LoadingState;
//   error: Error | null;
// }

// const initialState: ProjectViewState = {
//   error: null,
//   projectAddLoadingState: LoadingState.INITIAL,
//   projectListLoadingState: LoadingState.INITIAL,
//   projectRemoveLoadingState: LoadingState.INITIAL,
//   projectUpdateLoadingState: LoadingState.INITIAL,
//   projects: [],
//   selectedProject: null,
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class ProjectViewStoreService extends ComponentStore<ProjectViewState> {
//   constructor() {
//     super(initialState);
//   }
// }
