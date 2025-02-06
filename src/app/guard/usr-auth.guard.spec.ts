import { TestBed, async, inject } from '@angular/core/testing';

import { UsrAuthGuard } from './usr-auth.guard';

describe('UsrAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsrAuthGuard]
    });
  });

  it('should ...', inject([UsrAuthGuard], (guard: UsrAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
