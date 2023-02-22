import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {log} from "util";
import {co} from "chart.js/dist/chunks/helpers.core";


@Component({
  selector: 'app-main',
  templateUrl: './aboutStudent.component.html',
  styleUrls: ['./aboutStudent.component.css'
  ]
})
export class AboutStudentComponent implements OnInit {

  classForSearch;
  students: Observable<DiaryDTO>;

  constructor(private diaryDTOService: DiaryDTOService) {
  }

  ngOnInit() {
  }

  search() {
   this.students = this.diaryDTOService.getInfoPupil(this.classForSearch)
  }
}
