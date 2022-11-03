import { TestBed } from '@angular/core/testing';
import {DiaryDTOService} from "./diaryDTO.service";

describe('DiaryDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaryDTOService = TestBed.get(DiaryDTOService);
    expect(service).toBeTruthy();
  });
});
