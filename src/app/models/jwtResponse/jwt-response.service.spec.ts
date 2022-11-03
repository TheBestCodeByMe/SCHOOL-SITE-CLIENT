import { TestBed } from '@angular/core/testing';

import { JwtResponseService } from './jwt-response.service';

describe('JwtResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtResponseService = TestBed.get(JwtResponseService);
    expect(service).toBeTruthy();
  });
});
