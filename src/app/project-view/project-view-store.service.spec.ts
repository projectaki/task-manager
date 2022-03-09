import { TestBed, waitForAsync } from '@angular/core/testing';
import { of, take, throwError } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { ProjectRole } from '../core/enums/project-role.enum';
import { ProjectService } from '../core/services/project.service';

import { ProjectViewStoreService } from './project-view-store.service';

fdescribe('ProjectViewStoreService', () => {
  let service: ProjectViewStoreService;
  let projectService: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectViewStoreService, ProjectService],
    });
    service = TestBed.inject(ProjectViewStoreService);
    projectService = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Invite user async', () => {
    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.projectUserInviteLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.inviteProjectUserAsync({ id: '1', email: 'a', role: ProjectRole.OWNER });
      service.projectUserInviteLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should add project user and loaded state to loaded on success',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'addProjectUser').and.returnValue(
          of({
            id: '1',
            accepted: false,
            company: 'Test',
            email: 'test',
            name: 'test',
            role: ProjectRole.CLIENT,
          })
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.inviteProjectUserAsync({ id: '1', email: 'a', role: ProjectRole.OWNER });
        service.projectUsers$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(1);
          expect(x[0].id).toBe('1');
        });
        service.projectUserInviteLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'addProjectUser').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.inviteProjectUserAsync({ id: '1', email: 'a', role: ProjectRole.OWNER });
        service.projectUsers$.subscribe(x => {
          expect(addSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(0);
        });
        service.projectUserInviteLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Remove user async', () => {
    beforeEach(
      waitForAsync(() => {
        service.patchState({
          projectUsers: [
            {
              id: '1',
              name: 'Akos',
              email: 'a@a.com',
              company: 'HR',
              accepted: true,
              role: ProjectRole.OWNER,
            },
            {
              id: '2',
              name: 'Marysia',
              email: 'a@a.com',
              company: 'JAPAN',
              accepted: false,
              role: ProjectRole.PARTICIPANT,
            },
            {
              id: '3',
              name: 'Jeff',
              email: 'a@a.com',
              company: 'MY HOSUE',
              accepted: true,
              role: ProjectRole.CLIENT,
            },
          ],
        });
      })
    );

    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.projectUserRemoveLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.removeProjectUserAsync({ id: '1', userId: '1' });
      service.projectUserRemoveLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should remove project user and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'removeProjectUser').and.returnValue(of('1'));

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.removeProjectUserAsync({ id: '1', userId: '1' });
        service.projectUsers$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(2);
          expect(x.filter(x => x.id === '1').length).toBe(0);
        });
        service.projectUserRemoveLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'removeProjectUser').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.removeProjectUserAsync({ id: '1', userId: '1' });
        service.projectUsers$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
        });
        service.projectUserRemoveLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('List users async', () => {
    it(
      'should start with initial loading state',
      waitForAsync(() => {
        service.projectUserListLoadingState$.subscribe(x => expect(x).toBe(LoadingState.INITIAL));
      })
    );

    it('should set loading state to loading', () => {
      service.listProjectUsersAsync('1');
      service.projectUserListLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should list project users and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'listProjectUsers').and.returnValue(
          of([
            {
              id: '1',
              name: 'Akos',
              email: 'a@a.com',
              company: 'HR',
              accepted: true,
              role: ProjectRole.OWNER,
            },
            {
              id: '2',
              name: 'Marysia',
              email: 'a@a.com',
              company: 'JAPAN',
              accepted: false,
              role: ProjectRole.PARTICIPANT,
            },
            {
              id: '3',
              name: 'Jeff',
              email: 'a@a.com',
              company: 'MY HOSUE',
              accepted: true,
              role: ProjectRole.CLIENT,
            },
          ])
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.listProjectUsersAsync('1');
        service.projectUsers$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
          expect(x.every(x => ['1', '2', '3'].includes(x.id))).toBe(true);
        });
        service.projectUserListLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'listProjectUsers').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.listProjectUsersAsync('1');
        service.projectUsers$.subscribe(x => {
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(0);
        });
        service.projectUserListLoadingState$.subscribe(x => expect(x).toBe(LoadingState.ERROR));
        service.errors$.subscribe(x => expect(x?.message).toBe('Error occured'));
      })
    );
  });

  describe('Select', () => {
    beforeEach(
      waitForAsync(() => {
        service.patchState({
          projectUsers: [
            {
              id: '1',
              name: 'Akos',
              email: 'a@a.com',
              company: 'HR',
              accepted: true,
              role: ProjectRole.OWNER,
            },
            {
              id: '2',
              name: 'Marysia',
              email: 'a@a.com',
              company: 'JAPAN',
              accepted: false,
              role: ProjectRole.PARTICIPANT,
            },
            {
              id: '3',
              name: 'Jeff',
              email: 'a@a.com',
              company: 'MY HOSUE',
              accepted: true,
              role: ProjectRole.CLIENT,
            },
          ],
        });
      })
    );

    it('should be null initially', () => {
      service.selectedProjectUser$.subscribe(x => expect(x).toBe(null));
    });

    it('should select proper project', () => {
      service.selectProjectUser('2');
      service.selectedProjectUser$.pipe(take(1)).subscribe(x => expect(x?.name).toBe('Marysia'));

      service.selectProjectUser('3');
      service.selectedProjectUser$.pipe(take(1)).subscribe(x => expect(x?.name).toBe('Jeff'));

      service.selectProjectUser('1');
      service.selectedProjectUser$.pipe(take(1)).subscribe(x => expect(x?.name).toBe('Akos'));
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
