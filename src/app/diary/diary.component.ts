import {Component, OnInit} from '@angular/core';
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {Observable} from "rxjs";
import {SubjectDTO} from "../models/subjectDTO/subjectDTO";
import {SubjectDTOService} from "../models/subjectDTO/subjectDTO.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-main',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css',
    './assetsDiary/bootstrap/css/bootstrap.min.css',
    './assetsDiary/fonts/fontawesome5-overrides.min.css',
    './assetsDiary/fonts/font-awesome.min.css',
    './assetsDiary/fonts/fontawesome-all.min.css'
  ]
})
export class DiaryComponent implements OnInit {

  diaryDTOs: Observable<DiaryDTO>;
  numberAttendance;
  subjects: Observable<SubjectDTO[]>;
  selectedTeamSubject: SubjectDTO = null;
  selectedValueSubject: SubjectDTO = null;

  ngOnInit() {
    this.reloadData();
  }

  constructor(private diaryDTOService: DiaryDTOService,
              private tokenStorage: TokenStorageService,
              private subjectDTOService: SubjectDTOService,
              private router: Router) {
  }

  reloadData() {
    this.diaryDTOs = this.diaryDTOService.getDiaryPupil(this.tokenStorage.getIdUser());
    this.subjectDTOService.getSubjects().subscribe(data => {
      this.subjects = data
    });
    this.reloadAttendanceAndSubject()
    console.log(this.diaryDTOs)
  }

  reloadAttendanceAndSubject() {
    this.diaryDTOService.getAttendance(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.numberAttendance = data;
      });
    console.log(this.diaryDTOs)
  }

  public selectedOptionChanged(subject: SubjectDTO): void {
    console.log(subject);
    this.diaryDTOs = this.diaryDTOService.getDiaryPupilByParams(this.tokenStorage.getIdUser(), subject.code, false, 1)
    this.reloadAttendanceAndSubject()
  }

  public selectedOptionDateChanged(date: string): void {
    console.log(date);
    this.diaryDTOs = this.diaryDTOService.getDiaryPupilByParams(this.tokenStorage.getIdUser(), date, true, 1)
    this.reloadAttendanceAndSubject()
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.diaryDTOs = this.diaryDTOService.getDiaryPupilByParams(this.tokenStorage.getIdUser(), event.value.toLocaleDateString(), true, 1)
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }
}
