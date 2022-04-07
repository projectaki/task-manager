import { TestBed } from '@angular/core/testing';
import { AttachTokenInterceptor } from './attach-token.interceptor';

describe('AttachTokenService', () => {
  let service: AttachTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachTokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
