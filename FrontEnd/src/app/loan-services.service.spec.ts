import { TestBed } from '@angular/core/testing';

import { LoanServicesService } from './loan-services.service';

describe('LoanServicesService', () => {
  let service: LoanServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
