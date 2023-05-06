import { TestBed } from '@angular/core/testing';

import {PupilTeacherDTOService} from "./pupilTeacherDTO.service";

describe('PupilTeacherDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PupilTeacherDTOService = TestBed.get(PupilTeacherDTOService);
    expect(service).toBeTruthy();
  });
});
