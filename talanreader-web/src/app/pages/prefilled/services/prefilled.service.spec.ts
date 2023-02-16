import { TestBed } from '@angular/core/testing';

import { PrefilledService } from './prefilled.service';

describe('PrefilledService', () => {
  let service: PrefilledService;

  beforeEach(() => {
    // Configure the testing module
    TestBed.configureTestingModule({});
    // Get an instance of the PrefilledService
    service = TestBed.inject(PrefilledService);
  });

  it('should be created', () => {
    // Test that the service is created
    expect(service).toBeTruthy();
  });
});
