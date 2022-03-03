import { TestBed, waitForAsync } from '@angular/core/testing';
import { of, switchMap, tap, throwError } from 'rxjs';
import { LoadingState } from '../core/models/loading-state.enum';
import { ProjectService } from '../core/project.service';

import { ProjectPageStoreService } from './project-page-store.service';
import { ProjectType } from './project-type.enum';

fdescribe('ProjectPageStoreService', () => {
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

        service.addProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(x.length).toBe(1);
          expect(x[0].id).toBe('1');
        });
        service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should length 0, push error message and set error state',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'add').and.returnValue(throwError(() => new Error('Error occured')));

        service.addProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(x.length).toBe(0);
        });
        service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Update async', () => {
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

    // it(
    //   'should update project and loaded state to loaded on success',
    //   waitForAsync(() => {
    //     const updateSpy = spyOn(projectService, 'update').and.returnValue(
    //       of({ id: '2', name: 'updated', projectType: ProjectType.OWNER })
    //     );

    //     service.updateProjectAsync({ id: '2', name: 'updated', projectType: ProjectType.OWNER });
    //     service.projects$.subscribe(x => {
    //       expect(updateSpy).toHaveBeenCalled();
    //       expect(x.length).toBe(1);
    //       expect(x[0].id).toBe('2');
    //       expect(x[0].name).toBe('updated');
    //     });
    //     //service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
    //   })
    // );

    it(
      'should length 0, push error message and set error state',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'add').and.returnValue(throwError(() => new Error('Error occured')));

        service.addProjectAsync({ id: '1', name: 'a', projectType: ProjectType.OWNER });
        service.projects$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(x.length).toBe(0);
        });
        service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Remove async', () => {
    it('should remove project to list', () => {});
  });

  describe('List async', () => {
    it('should list project to list', () => {});
  });

  describe('Select', () => {
    it('should select project', () => {});
  });
});
