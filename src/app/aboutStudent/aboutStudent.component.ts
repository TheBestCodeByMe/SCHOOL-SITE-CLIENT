import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {log} from "util";
import {co} from "chart.js/dist/chunks/helpers.core";
import {MainComponent} from "../main/main.component";
import {UserDTO} from "../models/userDTO/userDTO";
import {ClassroomDTO} from "../models/classroomDTO/classroomDTO";
import {ScheduleDatesDTO} from "../models/scheduleDatesDTO/scheduleDatesDTO";
import {ClassroomDTOService} from "../models/classroomDTO/classroomDTO.service";


@Component({
  selector: 'app-main',
  templateUrl: './aboutStudent.component.html',
  styleUrls: ['./aboutStudent.component.css'
  ]
})
export class AboutStudentComponent implements OnInit {

  classForSearch;
  students: Observable<DiaryDTO>;
  classnames: Observable<ClassroomDTO[]>;
  selectedTeamClass: ClassroomDTO = null;
  selectedValueClass: ClassroomDTO = null;

  constructor(private diaryDTOService: DiaryDTOService,
              private classroomDTOService: ClassroomDTOService) {
  }

  ngOnInit() {
    this.classroomDTOService.getClassroomDTOsList().subscribe(data => {
      this.classnames = data;
    })
  }

  search() {
    if (this.classForSearch != "") {
      this.diaryDTOService.getInfoPupil(this.classForSearch)
        .subscribe(
          data => {
            this.students = data
          },
          error => {
            console.log(error);
            MainComponent.sendNotification('Неверные данные', {
                body: 'Введены неверные данные! Ошибка: ' + error.error.message,
                icon: 'icon.jpg',
                dir: 'auto'
              },
              'Введите другой класс')
          }
        );
    } else {
      MainComponent.sendNotification('Неверные данные', {
          body: 'Данные не введены!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Введите название класса в формате - "11 А"')
    }
  }

  public selectedOptionChanged(classroomDTO: ClassroomDTO): void {
    this.students = this.diaryDTOService.getInfoPupil(classroomDTO.name);
  }
}
