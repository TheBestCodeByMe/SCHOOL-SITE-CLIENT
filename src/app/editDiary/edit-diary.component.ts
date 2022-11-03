import {Component, OnInit} from '@angular/core';
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './edit-diary.component.html',
  styleUrls: ['./edit-diary.component.css',
    './assets/fonts/font-awesome.min.css',
    './assets/fonts/fontawesome-all.min.css',
    './assets/fonts/fontawesome5-overrides.min.css',
    './assets/bootstrap/css/bootstrap.min.css'
  ]
})
export class EditDiaryComponent implements OnInit {

  diaryDTO: DiaryDTO = new DiaryDTO();
  fioPupil;
  check;
  className;

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

    this.diaryDTOService.createAttendanceAndAcademicPerfomance(this.diaryDTO)
      .subscribe(data => console.log(data), error => console.log(error));

    this.diaryDTO = new DiaryDTO();
    this.fioPupil = "";
  }

  addHomework() {
    this.diaryDTO.namePupil = "";
    this.diaryDTO.lastnamePupil = "";
    this.diaryDTO.patronymicPupil = "";
    this.diaryDTO.grade = "";
    this.diaryDTO.attendance = false;

    this.diaryDTOService.createAttendanceAndAcademicPerfomance(this.diaryDTO)
      .subscribe(data => console.log(data), error => console.log(error));

    this.diaryDTO = new DiaryDTO();
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }
}
