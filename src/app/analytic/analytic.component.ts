import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {PupilDTO} from "../models/pupilDTO/pupilDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";


@Component({
  selector: 'app-main',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css',
    'assets/bootstrap/css/bootstrap.min.css',
  ]
})
export class AnalyticComponent implements OnInit {

  numberAttendance;
  averageGrade;
  pupilDTO: PupilDTO = new PupilDTO;

  constructor(private diaryDTOService: DiaryDTOService,
              private pupilDTOService: PupilDTOService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.diaryDTOService.getAttendance(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.numberAttendance = data;
      });
    this.pupilDTOService.getPupilDTOByUserId(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.pupilDTO = data;
      });
    this.diaryDTOService.getAverageGrade(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.averageGrade = data;
      });
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }

  saveGrades() {
    //this.diaryDTOService.saveGrades(this.tokenStorage.getIdUser());
    this.diaryDTOService.getSaveGrades(this.tokenStorage.getIdUser()).subscribe(data=>{console.log(data);});
  }
}
