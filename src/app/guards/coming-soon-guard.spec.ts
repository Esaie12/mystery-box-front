import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { comingSoonGuard } from './coming-soon-guard';

describe('comingSoonGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => comingSoonGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
