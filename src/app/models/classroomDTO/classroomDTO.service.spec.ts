import { TestBed } from '@angular/core/testing';
import {ClassroomDTOService} from "./classroomDTO.service";

describe('ClassroomDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassroomDTOService = TestBed.get(ClassroomDTOService);
    expect(service).toBeTruthy();
  });
});
