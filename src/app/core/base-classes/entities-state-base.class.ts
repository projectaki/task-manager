import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { LoadingState } from '../enums/loading-state.enum';

export interface ItemService<T> {
  add: (x: T) => Observable<T>;
  delete: (x: string) => Observable<string>;
  list: (x: string) => Observable<T[]>;
  update: (x: T) => Observable<T>;
}

export interface BaseState<T> {
  entities: T[];
  selectedEntity: T | null;
  addingLoadingState: LoadingState;
  removingLoadingState: LoadingState;
  listingLoadingState: LoadingState;
  updatingLoadingState: LoadingState;
  error: Error | null;
}

export abstract class TemplateStateService<T extends { id?: string }, K extends BaseState<T>> extends ComponentStore<
  K | BaseState<T>
> {
  readonly entities$: Observable<any[]> = this.select(state => state.entities);
  readonly selectedEntity$: Observable<any | null> = this.select(state => state.selectedEntity);
  readonly addingLoadingState$: Observable<LoadingState> = this.select(state => state.addingLoadingState);
  readonly listingLoadingState$: Observable<LoadingState> = this.select(state => state.listingLoadingState);
  readonly removingLoadingState$: Observable<LoadingState> = this.select(state => state.removingLoadingState);
  readonly updatingLoadingState$: Observable<LoadingState> = this.select(state => state.updatingLoadingState);
  readonly errors$: Observable<Error | null> = this.select(state => state.error);

  readonly vm$ = this.select(
    this.entities$,
    this.selectedEntity$,
    this.addingLoadingState$,
    this.listingLoadingState$,
    this.removingLoadingState$,
    this.updatingLoadingState$,
    this.errors$,
    (
      entities,
      selectedEntity,
      addingLoadingState,
      listingLoadingState,
      removingLoadingState,
      updatingLoadingState,
      errors
    ) => ({
      entities,
      selectedEntity,
      addingLoadingState,
      listingLoadingState,
      removingLoadingState,
      updatingLoadingState,
      errors,
    })
  );

  constructor(private itemService: ItemService<T>, initialState: K | BaseState<T>) {
    super(initialState);
  }

  public readonly addEntityAsync = this.effect((entity$: Observable<T>) => {
    return entity$.pipe(
      tap(() => this.patchState({ addingLoadingState: LoadingState.LOADING })),
      switchMap(p => this.itemService.add(p).pipe(tapResponse(this.onAddEntitySuccess, this.onAddEntityError)))
    );
  });

  public readonly removeEntityAsync = this.effect((entityId$: Observable<string>) => {
    return entityId$.pipe(
      tap(() => this.patchState({ removingLoadingState: LoadingState.LOADING })),
      switchMap(id =>
        this.itemService.delete(id).pipe(tapResponse(this.onRemoveEntitySuccess, this.onRemoveEntityError))
      )
    );
  });

  public readonly listEntitiesAsync = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      tap(() => this.patchState({ listingLoadingState: LoadingState.LOADING })),
      switchMap(id => this.itemService.list(id).pipe(tapResponse(this.onListEntitiesSuccess, this.onListEntitiesError)))
    );
  });

  public readonly updateEntityAsync = this.effect((entity$: Observable<T>) => {
    return entity$.pipe(
      tap(() => this.patchState({ updatingLoadingState: LoadingState.LOADING })),
      switchMap(p => this.itemService.update(p).pipe(tapResponse(this.onUpdateEntitySuccess, this.onUpdateEntityError)))
    );
  });

  public readonly selectEntity = this.updater((state, id: string) => ({
    ...state,
    selectedEntity: { ...state.entities.find(x => x.id === id)! },
  }));

  private onAddEntitySuccess = (entity: T) => {
    this.addEntity(entity);
    this.patchState({ addingLoadingState: LoadingState.LOADED });
  };

  private onAddEntityError = (e: Error) => {
    this.patchState({ addingLoadingState: LoadingState.ERROR, error: e });
  };

  private onRemoveEntitySuccess = (id: string) => {
    this.deleteEntity(id);
    this.patchState({ removingLoadingState: LoadingState.LOADED });
  };

  private onRemoveEntityError = (e: Error) => {
    this.patchState({ removingLoadingState: LoadingState.ERROR, error: e });
  };

  private onListEntitiesSuccess = (entities: T[]) => {
    this.patchState({ entities, listingLoadingState: LoadingState.LOADED });
  };

  private onListEntitiesError = (e: Error) => {
    this.patchState({ listingLoadingState: LoadingState.ERROR, error: e });
  };

  private onUpdateEntitySuccess = (entity: T) => {
    this.updateEntity(entity);
    this.patchState({ updatingLoadingState: LoadingState.LOADED });
  };

  private onUpdateEntityError = (e: Error) => {
    this.patchState({ updatingLoadingState: LoadingState.ERROR, error: e });
  };

  private readonly addEntity = this.updater((state, entity: T) => ({
    ...state,
    entities: [...state.entities, entity],
  }));

  private readonly updateEntity = this.updater((state, entity: T) => {
    const index = state.entities.findIndex(x => x.id === entity.id);
    return {
      ...state,
      entities: [...state.entities.slice(0, index), entity, ...state.entities.slice(index + 1)],
    };
  });

  private readonly deleteEntity = this.updater((state, id: string) => ({
    ...state,
    entities: state.entities.filter(x => x.id !== id),
  }));
}
