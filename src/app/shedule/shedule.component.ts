import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SheduleService} from "../models/shedule/shedule.service";
import {SheduleDTOService} from "../models/sheduleDTO/sheduleDTO.service";
import {Observable} from "rxjs";
import {SheduleDTO} from "../models/sheduleDTO/sheduleDTO";


@Component({
  selector: 'app-main',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css',
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/fonts/font-awesome.min.css',
    './assets/fonts/fontawesome5-overrides.min.css',
    './assets/fonts/fontawesome-all.min.css'
  ]
})
export class SheduleComponent implements OnInit {

  dateForSchedule;
  schedule: Observable<SheduleDTO>;

  constructor(private tokenStorageService: TokenStorageService,
              private scheduleDTOService: SheduleDTOService) {
  }

  ngOnInit() {
  }

  search() {
    this.schedule = this.scheduleDTOService.getSchedulePupil(this.tokenStorageService.getIdUser(), this.dateForSchedule);
    console.log(this.schedule);
  }
}
