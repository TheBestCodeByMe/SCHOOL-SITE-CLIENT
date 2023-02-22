import {Component, OnInit} from '@angular/core';
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './edit-diary.component.html',
  styleUrls: ['./edit-diary.component.css',
    './assetsEditDiary/fonts/font-awesome.min.css',
    './assetsEditDiary/fonts/fontawesome-all.min.css',
    './assetsEditDiary/fonts/fontawesome5-overrides.min.css',
    './assetsEditDiary/bootstrap/css/bootstrap.min.css'
  ]
})
export class EditDiaryComponent implements OnInit {

  diaryDTO: DiaryDTO = new DiaryDTO();
  fioPupil;
  check;
  className;
  errorMessage: Object = '';
  errorMessage1: Object = '';
  isPupilFailed = false;
  isClassFailed = false;
  s = 1;
  s1 = 1;
  date;

  ngOnInit() {
  }

  constructor(private diaryDTOService: DiaryDTOService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  addGradle() {
    const temp = this.fioPupil.split(" ");
    this.diaryDTO.namePupil = temp[1];
    this.diaryDTO.lastnamePupil = temp[0];
    this.diaryDTO.patronymicPupil = temp[2];
    this.diaryDTO.homework = "";
    this.diaryDTO.className = "";

    this.diaryDTOService.createAttendanceAndAcademicPerfomance(this.diaryDTO, this.date)
      .subscribe(data => {
        console.log(data);
        this.isPupilFailed = false;
        this.s1 = 3;
        this.errorMessage1 = "";
      }, error => {
        console.log(error);
        this.errorMessage1 = error.error;
        this.isPupilFailed = true;
        this.s1 = 2;
      });

    this.diaryDTO = new DiaryDTO();
    this.fioPupil = "";
  }

  addHomework() {
    this.diaryDTO.namePupil = "";
    this.diaryDTO.lastnamePupil = "";
    this.diaryDTO.patronymicPupil = "";
    this.diaryDTO.grade = "";
    this.diaryDTO.attendance = false;

    this.diaryDTOService.createAttendanceAndAcademicPerfomance(this.diaryDTO, this.date)
      .subscribe(data => {
        console.log(data);
        this.isClassFailed = false;
        this.s = 3;
      }, error => {
        this.errorMessage = error.error;
        this.isClassFailed = true;
        this.s = 2;
      });

    this.diaryDTO = new DiaryDTO();
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }
}
