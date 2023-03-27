import { TestBed } from '@angular/core/testing';
import {SubjectDTOService} from "./subjectDTO.service";

describe('SubjectDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectDTOService = TestBed.get(SubjectDTOService);
    expect(service).toBeTruthy();
  });
});
