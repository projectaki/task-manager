import { TestBed, waitForAsync } from '@angular/core/testing';
import { of, take, throwError } from 'rxjs';
import { LoadingState } from '../core/enums/loading-state.enum';
import { TaskTag } from '../core/enums/task-tag.enum';
import { ProjectService } from '../core/services/project.service';

import { ProjectTaskStoreService } from './project-task-store.service';

describe('ProjectTaskStoreService', () => {
  let service: ProjectTaskStoreService;
  let projectService: ProjectService;

  let mockProjectTaskInput = {
    id: '1',
    projectTaskItem: {
      id: '1',
      completed: true,
      tag: TaskTag.BUG,
      title: 'test',
    },
  };

  let mockTaskList = [
    {
      id: '1',
      completed: true,
      tag: TaskTag.BUG,
      title: 'test1',
    },
    {
      id: '2',
      completed: true,
      tag: TaskTag.BUG,
      title: 'test2',
    },
    {
      id: '3',
      completed: true,
      tag: TaskTag.FEATURE,
      title: 'test3',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectTaskStoreService, ProjectService],
    });
    service = TestBed.inject(ProjectTaskStoreService);
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
      service.addProjectTaskAsync(mockProjectTaskInput);
      service.addLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should add project task and loaded state to loaded on success',
      waitForAsync(() => {
        const addSpy = spyOn(projectService, 'addProjectTask').and.returnValue(
          of(mockProjectTaskInput.projectTaskItem)
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.addProjectTaskAsync(mockProjectTaskInput);
        service.projectTasks$.subscribe(x => {
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
        const addSpy = spyOn(projectService, 'addProjectTask').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.addProjectTaskAsync(mockProjectTaskInput);
        service.projectTasks$.subscribe(x => {
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
          projectTasks: mockTaskList,
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
      service.updateProjectTaskAsync({
        ...mockProjectTaskInput,
        projectTaskItem: { ...mockProjectTaskInput.projectTaskItem, id: '2', title: 'updated' },
      });
      service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should update project and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'updateProjectTask').and.returnValue(
          of({ ...mockProjectTaskInput.projectTaskItem, id: '2', title: 'updated' })
        );

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.updateProjectTaskAsync({
          ...mockProjectTaskInput,
          projectTaskItem: { ...mockProjectTaskInput.projectTaskItem, id: '2', title: 'updated' },
        });
        service.projectTasks$.subscribe(x => {
          const proj = x.find(x => x.id === '2');
          expect(updateSpy).toHaveBeenCalled();
          expect(patchSpy).toHaveBeenCalledTimes(2);
          expect(x.length).toBe(3);
          expect(proj!.title).toBe('updated');
        });
        service.updateLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADED));
      })
    );

    it(
      'should be length 0, push error message and set error state',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'updateProjectTask').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.updateProjectTaskAsync({
          ...mockProjectTaskInput,
          projectTaskItem: { ...mockProjectTaskInput.projectTaskItem, id: '2', title: 'updated' },
        });
        service.projectTasks$.subscribe(x => {
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
          projectTasks: mockTaskList,
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
      service.removeProjectTaskAsync({ id: '1', projectTaskId: '1' });
      service.removeLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should remove project and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'removeProjectTask').and.returnValue(of('1'));

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.removeProjectTaskAsync({ id: '1', projectTaskId: '1' });
        service.projectTasks$.subscribe(x => {
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
        const updateSpy = spyOn(projectService, 'removeProjectTask').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.removeProjectTaskAsync({ id: '1', projectTaskId: '1' });
        service.projectTasks$.subscribe(x => {
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
      service.listProjectTasksAsync('1');
      service.listLoadingState$.subscribe(x => expect(x).toBe(LoadingState.LOADING));
    });

    it(
      'should list projects and loaded state to loaded on success',
      waitForAsync(() => {
        const updateSpy = spyOn(projectService, 'listProjectTasks').and.returnValue(of(mockTaskList));

        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.listProjectTasksAsync('1');
        service.projectTasks$.subscribe(x => {
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
        const updateSpy = spyOn(projectService, 'listProjectTasks').and.returnValue(
          throwError(() => new Error('Error occured'))
        );
        const patchSpy = spyOn(service, 'patchState').and.callThrough();

        service.listProjectTasksAsync('1');
        service.projectTasks$.subscribe(x => {
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
          projectTasks: mockTaskList,
        });
      })
    );

    it('should be null initially', () => {
      service.selectedProject$.subscribe(x => expect(x).toBe(null));
    });

    it('should select proper project', () => {
      service.selectProjectTask('2');
      service.selectedProject$.pipe(take(1)).subscribe(x => expect(x?.title).toBe('test2'));

      service.selectProjectTask('3');
      service.selectedProject$.pipe(take(1)).subscribe(x => expect(x?.title).toBe('test3'));

      service.selectProjectTask('1');
      service.selectedProject$.pipe(take(2)).subscribe(x => expect(x?.title).toBe('test1'));
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
