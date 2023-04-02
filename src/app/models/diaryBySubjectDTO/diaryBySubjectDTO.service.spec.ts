import { TestBed } from '@angular/core/testing';
import {DiaryBySubjectDTOService} from "./diaryBySubjectDTO.service";
import {DiaryBySubjectDTO} from "./diaryBySubjectDTO";

describe('ScheduleDatesDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaryBySubjectDTOService = TestBed.get(DiaryBySubjectDTO);
    expect(service).toBeTruthy();
  });
});
