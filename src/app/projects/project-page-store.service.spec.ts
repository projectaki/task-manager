import { TestBed } from '@angular/core/testing';

import { ProjectPageStoreService } from './project-page-store.service';

describe('ProjectPageStoreService', () => {
  let service: ProjectPageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
