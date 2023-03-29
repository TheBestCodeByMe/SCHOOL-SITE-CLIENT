import { TestBed } from '@angular/core/testing';
import {ScheduleDatesDTOService} from "./scheduleDatesDTO.service";
import {ScheduleDatesDTO} from "./scheduleDatesDTO";

describe('ScheduleDatesDTOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleDatesDTOService = TestBed.get(ScheduleDatesDTO);
    expect(service).toBeTruthy();
  });
});
