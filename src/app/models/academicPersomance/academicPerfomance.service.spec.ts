import { TestBed } from '@angular/core/testing';
import {AcademicPerfomanceService} from "./academicPerfomance.service";

describe('AcademicPerfomanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcademicPerfomanceService = TestBed.get(AcademicPerfomanceService);
    expect(service).toBeTruthy();
  });
});
