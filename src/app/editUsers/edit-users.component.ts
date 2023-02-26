import {Component, OnInit} from '@angular/core';
import {catchError, Observable, Subscription, tap} from "rxjs";
import {User} from "../models/users/user";
import {UserService} from "../models/users/user.service";
import {Router} from "@angular/router";
import {PupilDTO} from "../models/pupilDTO/pupilDTO";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";
import {Pupil} from "../models/pupils/pupil";
import {Parents} from "../models/parents/parents";
import {PupilService} from "../models/pupils/pupil.service";
import {ParentsService} from "../models/parents/parents.service";
import {Teacher} from "../models/teachers/teacher";
import {TeacherService} from "../models/teachers/teacher.service";
import {ClassroomDTOSearchService} from "../models/classroomDTOSearch/classroomDTOSearch.service";
import {Subject} from "../models/subjects/subject";
import {SubjectService} from "../models/subjects/subject.service";
import {SheduleDTO} from "../models/sheduleDTO/sheduleDTO";
import {SheduleDTOService} from "../models/sheduleDTO/sheduleDTO.service";
import {ClassroomDTO} from "../models/classroomDTO/classroomDTO";
import {ClassroomDTOService} from "../models/classroomDTO/classroomDTO.service";
import {LoginInfo} from "../models/login-info/login-info";
import {MainComponent} from "../main/main.component";


@Component({
  selector: 'app-main',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css',
    './assetsEditUsers/css/styles.css',
    './assetsEditUsers/css/EU-Form-with-Photo.css'
  ]
})
export class EditUsersComponent implements OnInit {

  users: Observable<User[]>;
  pupilDTOs: Observable<PupilDTO[]>;
  pupil: Pupil = new Pupil();
  parents: Parents = new Parents();
  fioMom;
  fioDad;
  fioTeacher;
  parentForId: Observable<Parents[]>;
  pupilDToForReg: PupilDTO = new PupilDTO();
  teacher: Teacher = new Teacher();
  classroomDTO: ClassroomDTO = new ClassroomDTO();
  subject: Subject = new Subject();
  scheduleDTO: SheduleDTO = new SheduleDTO();
  loginForDel;

  errorMessage = '';
  isSignUpFailed = false;

  constructor(private userService: UserService,
              private pupilDTOService: PupilDTOService,
              private pupilService: PupilService,
              private parentService: ParentsService,
              private teacherService: TeacherService,
              private classroomService: ClassroomDTOSearchService,
              private subjectService: SubjectService,
              private sheduleDTOService: SheduleDTOService,
              private classroomDTOService: ClassroomDTOService,
              private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUsersList();
    this.pupilDTOs = this.pupilDTOService.getPupilDTOsList();
  }

  savePupil() {
    const tempMom = this.fioMom.split(" ");
    this.pupilDToForReg.nameMom = tempMom[0];
    this.pupilDToForReg.lastnameMom = tempMom[1];
    this.pupilDToForReg.patronymicMom = tempMom[2];
    const tempDad = this.fioDad.split(" ");
    this.pupilDToForReg.nameDad = tempDad[0];
    this.pupilDToForReg.lastnameDad = tempDad[1];
    this.pupilDToForReg.patronymicDad = tempDad[2];

    this.pupilDToForReg.email = "";

    // возвращает null, если не сохранено
    // сущность, если сохранено
    this.pupilDTOService.createPupilDTO(this.pupilDToForReg)
      .subscribe(data => {
        console.log(data)
        this.isSignUpFailed = false;
        this.errorMessage = data.message
      }, error => {
        console.log(error)
        this.isSignUpFailed = true;
        this.errorMessage = error.error
      });

    /*
    //this.parentForId = this.parentService.createParents(this.parents);

    //this.parentForId.forEach(parent => this.pupil.parentsId = parent[0].id);

    //this.pupilService.createPupil(this.pupil)
    //       .subscribe(data => console.log(data), error => console.log(error));

    // .pipe(tap(() => {
    //   crPupil(this.pupil, this.pupilService, this.pId)
    // }));

    // function crPupil(pupil, pupilService, pId) {
    //   if (pId != null) {
    //     pupil.parentsId = pId;
    //     pupilService.createPupil(pupil)
    //       .subscribe(data => console.log(data), error => console.log(error));
    //   }
    // }
    //  .subscribe(((data: any) => this.pupil.parentsId = data), error => console.log(error));
    //this.parentService.getParentsByFIO(this.parents)
    //  .subscribe(data => console.log(data), error => console.log(error));
*/
    this.pupilDToForReg = new PupilDTO();
  }

  createTeacher() {
    this.teacherService.createTeacher(this.teacher)
      .subscribe(data => {
        console.log(data);
        MainComponent.sendNotification('Учитель создан', {
            body: 'Учитель ' + this.teacher.name + ' ' + this.teacher.lastName + ' создан!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
        this.teacher = new Teacher();
      }, error => {
        console.log(error);
        MainComponent.sendNotification('Учитель не создан', {
            body: 'Ошибка при создании: ' + error.error.message + '!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      });
  }

  createSubject() {
    this.subjectService.createSubject(this.subject)
      .subscribe(data => {
        console.log(data);
        MainComponent.sendNotification('Предмет создан', {
            body: 'Предмет ' + this.subject.name + ' создан!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
        this.subject = new Subject();
      }, error => {
        console.log(error);
        MainComponent.sendNotification('Предмет не создан', {
            body: 'Ошибка при создании: ' + error.error.message + '!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      });
  }

  createSchedule() {
    const tempTeacher = this.fioTeacher.split(" ");
    this.scheduleDTO.nameTeacher = tempTeacher[1];
    this.scheduleDTO.lastnameTeacher = tempTeacher[0];
    this.scheduleDTO.patronymicTeacher = tempTeacher[2];

    // возвращает в имени предмета строку с комментарием ошибки, если что-то не так
    // возвращает сущность, если всё так
    this.sheduleDTOService.createSheduleDTO(this.scheduleDTO)
      .subscribe(data => {
        console.log(data);

        this.scheduleDTO = new SheduleDTO()
      }, error => {
        console.log(error.error.message);
      });
  }

  createClassNameWithTeacher() {
    // возвращает текст в имени класса, если такой класс уже есть или такого преподавателя нет
    // возвращает сущность, если всё так
    this.classroomDTOService.createClassroomDTO(this.classroomDTO)
      .subscribe(data => {
        console.log(data);
        MainComponent.sendNotification('Предмет не создан', {
            body: 'Класс ' + this.classroomDTO.name + ' создан!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
        this.classroomDTO = new ClassroomDTO();
      }, error => {
        console.log(error);
        MainComponent.sendNotification('Класс не создан', {
            body: 'Ошибка при создании: ' + error.error.message + '!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      });
  }

  blockUser() {
    this.userService.blockUser(this.loginForDel)
      .subscribe(data => {console.log(data);
        MainComponent.sendNotification('Пользователь заблокирован', {
            body: 'Пользователь ' + this.loginForDel + ' заблокирован!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
        }, error => {console.log(error);
        MainComponent.sendNotification('Пользователь не заблокирован', {
            body: 'Ошибка при блокировке: логин введен неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');});
  }

  unBlockUser() {
    this.userService.unblockUser(this.loginForDel)
      .subscribe(data => {console.log(data);
        MainComponent.sendNotification('Пользователь разблокирован', {
            body: 'Пользователь ' + this.loginForDel + ' разблокирован!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');}, error => {console.log(error);
        MainComponent.sendNotification('Пользователь не разблокирован', {
            body: 'Ошибка при разблокировке: логин введен неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');});
  }

  deleteUser() {
    this.userService.deleteUser(this.loginForDel)
      .subscribe(data => {console.log(data);
        MainComponent.sendNotification('Пользователь удален', {
            body: 'Пользователь ' + this.loginForDel + ' удален!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');}, error => {
        console.log(error);
        MainComponent.sendNotification('Пользователь не удален', {
            body: 'Ошибка при удалении: логин введен неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      });
  }
}
