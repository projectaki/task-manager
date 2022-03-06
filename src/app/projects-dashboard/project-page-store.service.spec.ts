import { TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of, skip, switchMap, take, tap, throwError } from 'rxjs';
import { LoadingState } from '../core/models/loading-state.enum';
import { ProjectService } from '../core/project.service';

import { ProjectPageStoreService } from './project-page-store.service';
import { ProjectType } from './project-type.enum';

describe('ProjectPageStoreService', () => {
  let service: ProjectPageStoreService;
  let projectService: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectPageStoreService, ProjectService],
    });
    service = TestBed.inject(ProjectPageStoreService);
    projectService = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Add async', () => {
    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.addProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
      service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should add project and loaded state to loaded on success',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'add').and.returnValue(
          of({ id: '1', name: 'a', projectType: ProjectType.OWNER })
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.addProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(1);
          expect(x[0].id).toBe('1');
        });
        service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'add').and.returnValue(throwError(() => new Error('Error occured')));
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.addProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(0);
        });
        service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Update async', () => {
    beforeEach(
      waitForAsync(() => {
        service.patchState({
          projects: [
            { id: '1', name: 'a', projectType: ProjectType.OWNER },
            { id: '2', name: 'a', projectType: ProjectType.OWNER },
            { id: '3', name: 'a', projectType: ProjectType.OWNER },
          ],
        });
      })
    );

    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.updateProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
      service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should update project and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'update').and.returnValue(
          of({ id: '2', name: 'updated', projectType: ProjectType.OWNER })
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.updateProjectAsync({ id: '2', name: 'updated', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          const proj = x.find(x => x.id === '2');
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
          expect(proj!.name).toBe('updated');
        });
        service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'update').and.returnValue(throwError(() => new Error('Error occured')));
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.updateProjectAsync({ id: '2', name: 'updated', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
        });
        service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Remove async', () => {
    beforeEach(
      waitForAsync(() => {
        service.patchState({
          projects: [
            { id: '1', name: 'a', projectType: ProjectType.OWNER },
            { id: '2', name: 'a', projectType: ProjectType.OWNER },
            { id: '3', name: 'a', projectType: ProjectType.OWNER },
          ],
        });
      })
    );

    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.removeLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.removeProjectAsync('1');
      service.removeLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should remove project and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'delete').and.returnValue(of('1'));

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.removeProjectAsync('1');
        service.projects$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(2);
          expect(x.filter(x => x.id === '1').length).toBe(0);
        });
        service.removeLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'delete').and.returnValue(throwError(() => new Error('Error occured')));
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.removeProjectAsync('1');
        service.projects$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
        });
        service.removeLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('List async', () => {
    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.listLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.listProjectsAsync('1');
      service.listLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should list projects and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'list').and.returnValue(
          of([
            { id: '1', name: 'a', projectType: ProjectType.OWNER },
            { id: '2', name: 'a', projectType: ProjectType.OWNER },
            { id: '3', name: 'a', projectType: ProjectType.OWNER },
          ])
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.listProjectsAsync('1');
        service.projects$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
          expect(x.every(x => ['1', '2', '3'].includes(x.id))).toBe(true);
        });
        service.listLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'list').and.returnValue(throwError(() => new Error('Error occured')));
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.listProjectsAsync('1');
        service.projects$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(0);
        });
        service.listLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Select', () => {
    beforeEach(
      waitForAsync(() => {
        service.patchState({
          projects: [
            { id: '1', name: 'a', projectType: ProjectType.OWNER },
            { id: '2', name: 'b', projectType: ProjectType.OWNER },
            { id: '3', name: 'c', projectType: ProjectType.OWNER },
          ],
        });
      })
    );

    it('should be null initially', () => {
      service.selectedProject$.subscribe(x => expect(x).toBe(null));
    });

    it('should select proper project', () => {
      service.selectProject('2');
      service.selectedProject$.pipe(take(1)).subscribe(x => expect(x?.name).toBe('b'));

      service.selectProject('3');
      service.selectedProject$.pipe(take(1)).subscribe(x => expect(x?.name).toBe('c'));

      service.selectProject('1');
      service.selectedProject$.pipe(take(2)).subscribe(x => expect(x?.name).toBe('a'));
    });
  });

  describe('Error', () => {
    it(
      'should be null',
      waitForAsync(() => {
        service.errors$.subscribe(x => expect(x).toBe(null));
      })
    );
  });
});
