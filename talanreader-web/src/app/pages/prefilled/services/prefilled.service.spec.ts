import { TestBed } from '@angular/core/testing';

import { PrefilledService } from './prefilled.service';

describe('PrefilledService', () => {
  let service: PrefilledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefilledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
