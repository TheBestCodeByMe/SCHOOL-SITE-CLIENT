import { TestBed } from '@angular/core/testing';

import { UserService } from '../users/user.service';
import {PupilInClassDTOService} from "./pupilInClassDTO.service";

describe('PupilInClassDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PupilInClassDTOService = TestBed.get(PupilInClassDTOService);
    expect(service).toBeTruthy();
  });
});
