import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BehaviorSubject, catchError, EMPTY, Observable, Subject, switchMap, tap } from 'rxjs';
import { ProjectService } from '../core/project.service';
import { Project } from './project.interface';

export interface ProjectPageState {
  projects: Project[];
}

@Injectable()
export class ProjectPageStoreService extends ComponentStore<ProjectPageState> {
  readonly projects$: Observable<Project[]> = this.select(state => state.projects);
  private projectAddSuccess = new Subject();
  private projectAddError = new Subject();
  public readonly projectAddSuccess$ = this.projectAddSuccess.asObservable();
  public readonly projectAddError$ = this.projectAddError.asObservable();

  constructor(private projectService: ProjectService) {
    super();
  }

  readonly addProjectAsync = this.effect((project$: Observable<Project>) => {
    return project$.pipe(
      switchMap(p =>
        this.projectService.add(p).pipe(tapResponse(this.projectAddSuccessCallback, this.projectAddErrorCallback))
      )
    );
  });

  readonly removeProjectAsync = this.effect((projectId$: Observable<string>) => {
    return projectId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(id =>
        this.projectService.delete(id).pipe(
          //👇 Act on the result within inner pipe.
          tapResponse(
            pid => this.deleteProject(pid),
            e => console.log(e)
          )
        )
      )
    );
  });

  readonly getProjectsAsync = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      switchMap(id =>
        this.projectService.list(id).pipe(
          tapResponse(
            projects => this.setState({ projects }),
            e => console.log(e)
          )
        )
      )
    );
  });

  private readonly addProject = this.updater((state, project: Project) => ({
    projects: [...state.projects, project],
  }));

  // private readonly updateProject = this.updateProject((state, project: Project) => ({

  // }))

  private readonly deleteProject = this.updater((state, id: string) => ({
    projects: state.projects.filter(x => x.id !== id),
  }));

  private projectAddSuccessCallback = (project: Project) => {
    this.addProject(project);
    this.projectAddSuccess.next(true);
  };

  private projectAddErrorCallback = (e: Error) => {
    console.log(e);
    this.projectAddError.next(true);
  };
}
