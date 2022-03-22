import { Injectable } from '@angular/core';
import { LoadingState } from '../enums/loading-state.enum';
import { ProjectListItem } from '../models/project-list-item.interface';
import { ProjectService } from '../services/project.service';
import { BaseState, TemplateStateService } from './entities-state-base.class';

interface XState extends BaseState<ProjectListItem> {}

const initialState: XState = {
  error: null,
  addingLoadingState: LoadingState.INITIAL,
  listingLoadingState: LoadingState.INITIAL,
  removingLoadingState: LoadingState.INITIAL,
  updatingLoadingState: LoadingState.INITIAL,
  entities: [],
  selectedEntity: null,
};

@Injectable({
  providedIn: 'root',
})
export class TestService extends TemplateStateService<ProjectListItem, XState> {
  constructor(private s: ProjectService) {
    super(s, initialState);
  }
}

//class XService implements ItemService<ProjectListItem> {
//   constructor(private s: ProjectService) {}
//   add = (x: ProjectListItem) => this.s.add(x);
//   delete = (x: string) => this.s.delete(x);
//   list = (x: string) => this.s.list(x);
//   update = (x: ProjectListItem) => this.s.update(x);
// }
