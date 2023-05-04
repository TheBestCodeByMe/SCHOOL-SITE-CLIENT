import {Component, OnInit} from '@angular/core';
import {DiaryDTO} from "../models/diaryDTO/diaryDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {MainComponent} from "../main/main.component";
import {Observable} from "rxjs";
import {Teacher} from "../models/teachers/teacher";
import {ClassroomDTO} from "../models/classroomDTO/classroomDTO";
import {ClassroomDTOService} from "../models/classroomDTO/classroomDTO.service";
import {SubjectDTO} from "../models/subjectDTO/subjectDTO";
import {SubjectDTOService} from "../models/subjectDTO/subjectDTO.service";
import {PupilInClassDTO} from "../models/pupilInClassDTO/pupilInClassDTO";
import {PupilInClassDTOService} from "../models/pupilInClassDTO/pupilInClassDTO.service";
import {ScheduleDatesDTOService} from "../models/scheduleDatesDTO/scheduleDatesDTO.service";
import {ScheduleDatesDTO} from "../models/scheduleDatesDTO/scheduleDatesDTO";
import {DiaryBySubjectDTOService} from "../models/diaryBySubjectDTO/diaryBySubjectDTO.service";
import {DiaryBySubjectDTO} from "../models/diaryBySubjectDTO/diaryBySubjectDTO";
import {DiaryBySubjectDTOList} from "../models/diaryBySubjectDTO/diaryBySubjectDTOList";
import {DiaryBySubjDTO} from "../models/diaryBySubjectDTO/diaryBySubjDTO";


@Component({
  selector: 'app-main',
  templateUrl: './edit-diary.component.html',
  styleUrls: ['./edit-diary.component.css',
    './assetsEditDiary/fonts/font-awesome.min.css',
    './assetsEditDiary/fonts/fontawesome-all.min.css',
    './assetsEditDiary/fonts/fontawesome5-overrides.min.css',
    './assetsEditDiary/bootstrap/css/bootstrap.min.css',
    './editDiaryAssets/bootstrap/css/bootstrap.min.css',
    './editDiaryAssets/fonts/fontawesome5-overrides.min.css'
  ]
})
export class EditDiaryComponent implements OnInit {

  diaryDTO: DiaryDTO = new DiaryDTO();
  fioPupil = "";
  check;
  className = "";
  errorMessage: Object = '';
  errorMessage1: Object = '';
  isPupilFailed = false;
  isClassFailed = false;
  s = 1;
  s1 = 1;
  date;
  classnames: Observable<ClassroomDTO[]>;
  subjects: Observable<SubjectDTO[]>;
  pupils: Observable<PupilInClassDTO[]>;
  selectedTeam: ClassroomDTO = null;
  selectedValue: ClassroomDTO = null;
  selectedTeamSubject: SubjectDTO = null;
  selectedValueSubject: SubjectDTO = null;
  selectedTeamDate: ScheduleDatesDTO = null;
  selectedValueDate: ScheduleDatesDTO = null;
  scheduleDates: Observable<ScheduleDatesDTO[]>;
  diaryBySubjectDTOs: DiaryBySubjectDTO;
  flag = false;
  homework = "";
  dateForHomework = "";

  constructor(private diaryDTOService: DiaryDTOService,
              private classroomDTOService: ClassroomDTOService,
              private subjectDTOService: SubjectDTOService,
              private pupilDTOService: PupilInClassDTOService,
              private scheduleDatesDTOService: ScheduleDatesDTOService,
              private diaryBySubjectDTOService: DiaryBySubjectDTOService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.classroomDTOService.getClassroomDTOsList().subscribe(data => {
      this.classnames = data
      /*const app = document.getElementById("classroom");
      for (let i = 0; i < data.length; i++) {
        app.innerHTML = app.innerHTML + "<option value=" + data[i].name + ">" + data[i].name + "</option>";
      }*/
    });
    /*    for (const appKey in this.classnames) {
          app.innerHTML = app.innerHTML + "<option>" + appKey + "</option>";
        }*/
    this.subjectDTOService.getSubjects().subscribe(data => {
      this.subjects = data
    });
  }

  /*  searchClass(valueClass:string, valueSubject:string): void {
      this.selectedTeam = valueClass;
      console.log(this.selectedTeam)
      this.selectedTeamSubject = valueSubject;
      console.log(this.selectedTeamSubject)
    }*/

  // TODO: add patterns and etc

  searchClass(): void {
    this.selectedTeam = this.selectedValue;
    console.log(this.selectedValue)
    console.log(this.selectedTeam)
    this.selectedTeamSubject = this.selectedValueSubject;
    console.log(this.selectedTeamSubject)
    this.pupilDTOService.getPupilsInClassDTO(this.selectedValue.name).subscribe(data => {
      this.pupils = data
    });
    this.scheduleDatesDTOService.getScheduleDates(this.selectedValueSubject.code, this.selectedValue.name, this.tokenStorage.getIdUser(), '1').subscribe(data => {
      this.scheduleDates = data;
      console.log(data)
    });
    this.diaryBySubjectDTOService.getDiaries(this.selectedValueSubject.code, this.selectedValue.name).subscribe(data => {
      console.log(data);
      this.diaryBySubjectDTOs = data;
      this.flag = true
    });
    this.homework = ""
  }

  // TODO: add teacherId in request (dates)
  // TODO: change обработку exceptions
  // TODO: убрать 0, чтобы означало, что ее нет
  addGradle() {
    const regexp = new RegExp('^[0-9]{1}$|^10$');

    if (this.diaryBySubjectDTOs.diaries.every(i => i.diary.every(d => regexp.test(d.grade)))) {
      this.diaryBySubjectDTOService.saveDiaries(this.diaryBySubjectDTOs, this.tokenStorage.getIdUser())
        .subscribe(data => {
          console.log(data);
          MainComponent.sendNotification('Успеваемость выставлена', {
              body: 'Ученикам выставлена успеваемость!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция выполнена');
        }, error => {
          console.log(error);
          MainComponent.sendNotification('Успеваемость не выставлена', {
              body: 'Ошибка при создании: ' + error.error + '!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция не выполнена');
        });
    } else {
      MainComponent.sendNotification('Успеваемость не выставлена', {
          body: 'Ошибка при создании: оценки выставлены некорректно, проверьте, чтобы оценки были от 0 до 10! 0, если оценки нет',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
    }
    setTimeout(() => this.searchClass(), 1000);
    // if (this.fioPupil != "" || (!this.diaryDTO.attendance || this.diaryDTO.grade != "") || this.diaryDTO.subject != "" || this.diaryDTO.dateLesson != "") {
    //   const temp = this.fioPupil.split(" ");
    //   this.diaryDTO.namePupil = temp[1];
    //   this.diaryDTO.lastnamePupil = temp[0];
    //   this.diaryDTO.patronymicPupil = temp[2];
    //   this.diaryDTO.homework = "";
    //   this.diaryDTO.className = "";
    //   this.diaryDTO.dateLesson = this.date
    //
    //   this.diaryDTOService.createAttendanceAndAcademicPerformance(this.diaryDTO)
    //     .subscribe(data => {
    //       console.log(data);
    //       this.isPupilFailed = false;
    //       //this.s1 = 3;
    //       //this.errorMessage1 = "";
    //       MainComponent.sendNotification('Успеваемость выставлена', {
    //           body: 'Ученику ' + this.diaryDTO.namePupil + ' ' + this.diaryDTO.lastnamePupil + ' выставлена успеваемость!',
    //           icon: 'icon.jpg',
    //           dir: 'auto'
    //         },
    //         'Операция выполнена');
    //       this.diaryDTO = new DiaryDTO();
    //       this.fioPupil = "";
    //     }, error => {
    //       console.log(error);
    //       if (error.error.text != "Выставлено") {
    //         MainComponent.sendNotification('Успеваемость не выставлена', {
    //             body: 'Ошибка при создании: ' + error.error + '!',
    //             icon: 'icon.jpg',
    //             dir: 'auto'
    //           },
    //           'Операция не выполнена');
    //       } else {
    //         MainComponent.sendNotification('Успеваемость выставлена', {
    //             body: 'Ученику ' + this.diaryDTO.namePupil + ' ' + this.diaryDTO.lastnamePupil + ' выставлена успеваемость!',
    //             icon: 'icon.jpg',
    //             dir: 'auto'
    //           },
    //           'Операция выполнена');
    //         this.diaryDTO = new DiaryDTO();
    //         this.fioPupil = "";
    //       }
    //       //this.isPupilFailed = true;
    //       //this.s1 = 2;
    //     });
    // } else {
    //   MainComponent.sendNotification('Успеваемость не выставлена', {
    //       body: 'Ошибка при создании: заполнены не все поля!',
    //       icon: 'icon.jpg',
    //       dir: 'auto'
    //     },
    //     'Операция не выполнена');
    // }
  }

  addHomework() {
    this.diaryDTO.namePupil = "";
    this.diaryDTO.lastnamePupil = "";
    this.diaryDTO.patronymicPupil = "";
    this.diaryDTO.grade = "";
    this.diaryDTO.attendance = false;

    if (this.diaryDTO.homework != "" && this.dateForHomework != "") {
      this.diaryDTO.subject = this.diaryBySubjectDTOs.subject
      this.diaryDTO.className = this.diaryBySubjectDTOs.classname
      this.diaryDTO.dateLesson = this.dateForHomework
      this.diaryDTO.homework = this.homework
      this.diaryDTOService.createAttendanceAndAcademicPerformance(this.diaryDTO)
        .subscribe(data => {
          console.log(data);
          //this.isClassFailed = false;
          //this.s = 3;
          MainComponent.sendNotification('Домашнее задание выставлено', {
              body: '' + this.diaryDTO.className + ' выставлено домашнее задание: ' + this.diaryDTO.homework + '!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция выполнена');
          this.diaryDTO = new DiaryDTO();
          this.scheduleDatesDTOService.getScheduleDates(this.selectedValueSubject.code, this.selectedValue.name, this.tokenStorage.getIdUser(), '1').subscribe(data => {
            this.scheduleDates = data;
            console.log(data)
          });
          this.homework = ""
          this.dateForHomework = ""
        }, error => {
          this.errorMessage = error.error;
          //this.isClassFailed = true;
          //this.s = 2;
          if (error.error.text != "Выставлено") {
            MainComponent.sendNotification('Домашнее задание не выставлено', {
                body: 'Ошибка при создании: ' + error.error + '!',
                icon: 'icon.jpg',
                dir: 'auto'
              },
              'Операция не выполнена');
          } else {
            MainComponent.sendNotification('Домашнее задание выставлено', {
                body: '' + this.diaryDTO.className + ' выставлено домашнее задание: ' + this.diaryDTO.homework + '!',
                icon: 'icon.jpg',
                dir: 'auto'
              },
              'Операция выполнена');
            this.diaryDTO = new DiaryDTO();
          }
        });
    } else {
      MainComponent.sendNotification('Домашнее задание не выставлено', {
          body: 'Ошибка при создании: заполнены не все поля!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
    }
  }

  public selectedOptionChanged(scheduleDatesDTO: ScheduleDatesDTO): void {
    console.log(scheduleDatesDTO);
    this.homework = scheduleDatesDTO.hometask
    this.dateForHomework = scheduleDatesDTO.dateSchedule
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }
}
