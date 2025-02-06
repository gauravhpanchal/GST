import { TestBed } from '@angular/core/testing';

import { WebFormsService } from './web-forms.service';

describe('WebFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebFormsService = TestBed.get(WebFormsService);
    expect(service).toBeTruthy();
  });
});
