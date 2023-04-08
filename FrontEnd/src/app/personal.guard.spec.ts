import { TestBed } from '@angular/core/testing';

import { PersonalGuard } from './personal.guard';

describe('PersonalGuard', () => {
  let guard: PersonalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
