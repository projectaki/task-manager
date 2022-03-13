import { TestBed } from '@angular/core/testing';

import { ProjectTaskStoreService } from './project-task-store.service';

describe('ProjectTaskStoreService', () => {
  let service: ProjectTaskStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTaskStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
