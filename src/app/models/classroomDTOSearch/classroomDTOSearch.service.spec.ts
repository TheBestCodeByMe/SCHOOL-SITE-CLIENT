import { TestBed } from '@angular/core/testing';
import {ClassroomDTOSearchService} from "./classroomDTOSearch.service";

describe('ClassroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassroomDTOSearchService = TestBed.get(ClassroomDTOSearchService);
    expect(service).toBeTruthy();
  });
});
