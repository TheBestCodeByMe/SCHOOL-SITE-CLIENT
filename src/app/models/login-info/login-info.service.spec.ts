import { TestBed } from '@angular/core/testing';

import { LoginInfoService } from './login-info.service';

describe('LoginInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginInfoService = TestBed.get(LoginInfoService);
    expect(service).toBeTruthy();
  });
});
