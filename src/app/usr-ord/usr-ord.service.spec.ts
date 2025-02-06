import { TestBed } from '@angular/core/testing';

import { UsrOrdService } from './usr-ord.service';

describe('UsrOrdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsrOrdService = TestBed.get(UsrOrdService);
    expect(service).toBeTruthy();
  });
});
