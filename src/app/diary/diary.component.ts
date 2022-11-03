import {Component, OnInit} from '@angular/core';
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css',
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/fonts/fontawesome5-overrides.min.css',
    './assets/fonts/font-awesome.min.css',
    './assets/fonts/fontawesome-all.min.css'
  ]
})
export class DiaryComponent implements OnInit {

  diaryDTOs: Observable<DiaryDTO>;
  numberAttendance;

  ngOnInit() {
    this.reloadData();
  }

  constructor(private diaryDTOService: DiaryDTOService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  reloadData() {
    this.diaryDTOs = this.diaryDTOService.getDiaryPupil(this.tokenStorage.getIdUser());
    this.diaryDTOService.getAttendance(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.numberAttendance = data;
      });
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }
}
