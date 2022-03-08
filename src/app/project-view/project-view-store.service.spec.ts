import { TestBed } from '@angular/core/testing';

import { ProjectViewStoreService } from './project-view-store.service';

describe('ProjectViewStoreService', () => {
  let service: ProjectViewStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectViewStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
