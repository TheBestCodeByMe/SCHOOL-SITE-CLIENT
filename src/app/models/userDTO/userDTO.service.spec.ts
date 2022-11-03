import { TestBed } from '@angular/core/testing';

import { UserDTOService } from './userDTO.service';

describe('UserDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDTOService = TestBed.get(UserDTOService);
    expect(service).toBeTruthy();
  });
});
