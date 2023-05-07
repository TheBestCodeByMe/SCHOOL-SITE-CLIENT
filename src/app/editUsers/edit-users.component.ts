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
import {SubjectDTO} from "../models/subjectDTO/subjectDTO";
import {SubjectDTOService} from "../models/subjectDTO/subjectDTO.service";


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
  subjects: Observable<SubjectDTO[]>;
  selectedTeamSubject: SubjectDTO = null;
  selectedValueSubject: SubjectDTO = null;
  classnames: Observable<ClassroomDTO[]>;
  selectedTeam: ClassroomDTO = null;
  selectedValue: ClassroomDTO = null;
  flag1 = true;
  teachers: Observable<Teacher[]>;
  selectedTeamTeacher: Teacher = null;
  selectedValueTeacher: Teacher = null;
  selectedTeamTeacherClass: Teacher = null;
  selectedValueTeacherClass: Teacher = null;

  errorMessage = '';
  isSignUpFailed = false;

  regexp = new RegExp('^[А-Яа-я\\-]{1,20}\u0020[А-Яа-я\\-]{1,20}\u0020[А-Яа-я\\-]{1,20}$');
  pupil_pattern = new RegExp('^[А-Яа-я\\-]{1,20}$');
  teacher_pattern = new RegExp('^[А-Яа-я\\-]{1,20}$');
  qualification_pattern = new RegExp('[А-Яа-я0-9\\,\\.\\-\\u0020\\/]{1,70}');
  position_pattern = new RegExp('[А-Яа-я]{1,20}');
  subject_name_pattern = new RegExp('[а-я\\u0020\\-]{1,20}');
  class_name_pattern = new RegExp('[0-9]{1,2}\\u0020[А-Я]');

  constructor(private userService: UserService,
              private pupilDTOService: PupilDTOService,
              private pupilService: PupilService,
              private parentService: ParentsService,
              private teacherService: TeacherService,
              private classroomService: ClassroomDTOSearchService,
              private subjectService: SubjectService,
              private sheduleDTOService: SheduleDTOService,
              private classroomDTOService: ClassroomDTOService,
              private subjectDTOService: SubjectDTOService,
              private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUsersList();
    this.pupilDTOs = this.pupilDTOService.getPupilDTOsList();
    this.subjectDTOService.getSubjects().subscribe(data => {
      this.subjects = data
    });
    this.classroomDTOService.getClassroomDTOsList().subscribe(data => {
      this.classnames = data
    });
    this.teacherService.getTeachersList().subscribe(data => {
      this.teachers = data
    });
  }

  getAllUsers() {
    this.users = this.userService.getAllUsersList();
  }

  savePupil() {
    var flag = true;

    if (this.selectedValue == null) {
      MainComponent.sendNotification('Вы не выбрали класс', {
          body: 'Ошибка при создании: выберите класс!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
      flag = false;
    }

    if (!this.regexp.test(this.fioMom) || !this.regexp.test(this.fioDad)) {
      MainComponent.sendNotification('Ошибка в ФИО родителей', {
          body: 'Ошибка при создании: ФИО родителей введено неверно, введите в формате - Фамилия Имя Отчество!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
      flag = false;
    }

    if (!this.pupil_pattern.test(this.pupilDToForReg.name) || !this.pupil_pattern.test(this.pupilDToForReg.lastname) || !this.pupil_pattern.test(this.pupilDToForReg.patronymic)) {
      MainComponent.sendNotification('Ошибка в ФИО ученика', {
          body: 'Ошибка при создании: ФИО ученика введено неверно!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
      flag = false;
    }

    console.log("987456321")

    // возвращает null, если не сохранено
    // сущность, если сохранено
    if (flag) {
      const tempMom = this.fioMom.split(" ");
      this.pupilDToForReg.nameMom = tempMom[0];
      this.pupilDToForReg.lastnameMom = tempMom[1];
      this.pupilDToForReg.patronymicMom = tempMom[2];
      const tempDad = this.fioDad.split(" ");
      this.pupilDToForReg.nameDad = tempDad[0];
      this.pupilDToForReg.lastnameDad = tempDad[1];
      this.pupilDToForReg.patronymicDad = tempDad[2];
      this.pupilDToForReg.className = this.selectedValue.name;

      this.pupilDToForReg.email = "";

      this.pupilDTOService.createPupilDTO(this.pupilDToForReg)
        .subscribe(data => {
          console.log(data)
          this.isSignUpFailed = false;
          MainComponent.sendNotification('Ученик создан', {
              body: 'Ученик создан!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция выполнена');
          this.pupilDToForReg = new PupilDTO();
          this.fioMom = "";
          this.fioDad = "";
        }, error => {
          console.log(error)
          this.isSignUpFailed = true;
          this.errorMessage = error.error.message
          MainComponent.sendNotification('Ученик не создан', {
              body: 'Ошибка при создании: ' + error.error.message + '!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция не выполнена');
        });
    }

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
  }

  createTeacher() {
    if (this.teacher_pattern.test(this.teacher.name) && this.teacher_pattern.test(this.teacher.lastName) && this.teacher_pattern.test(this.teacher.patronymic)) {
      if (this.qualification_pattern.test(this.teacher.qualification)) {
        if (this.position_pattern.test(this.teacher.position)) {
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
        } else {
          MainComponent.sendNotification('Ошибка в должности учителя', {
              body: 'Ошибка при создании: должность учителя введены неверно!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция не выполнена');
        }
      } else {
        MainComponent.sendNotification('Ошибка в квалификации учителя', {
            body: 'Ошибка при создании: квалификация учителя введено неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      }
    } else {
      MainComponent.sendNotification('Ошибка в ФИО учителя', {
          body: 'Ошибка при создании: ФИО учителя введено неверно!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
    }
  }

  createSubject() {
    if (this.subject_name_pattern.test(this.subject.name)) {
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
          this.reloadData()
        }, error => {
          console.log(error);
          MainComponent.sendNotification('Предмет не создан', {
              body: 'Ошибка при создании: ' + error.error.message + '!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция не выполнена');
        });
    } else {
      MainComponent.sendNotification('Ошибка в названии предмета', {
          body: 'Ошибка при создании: название предмета введено неверно!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
    }
  }

  createSchedule() {
    if (this.selectedValueTeacher != null) {
      if (this.selectedValue != null) {
        if (this.selectedValueSubject != null) {
          this.scheduleDTO.nameTeacher = this.selectedValueTeacher.name;
          this.scheduleDTO.lastnameTeacher = this.selectedValueTeacher.lastName;
          this.scheduleDTO.patronymicTeacher = this.selectedValueTeacher.patronymic;
          this.scheduleDTO.classroomName = this.selectedValue.name;
          this.scheduleDTO.subjectName = this.selectedValueSubject.name;

          this.sheduleDTOService.createSсheduleDTO(this.scheduleDTO)
            .subscribe(data => {
              console.log(data);
              MainComponent.sendNotification('Расписание создано', {
                  body: 'Расписание на ' + this.scheduleDTO.date + ' для ' + this.scheduleDTO.classroomName + ' класса создано!',
                  icon: 'icon.jpg',
                  dir: 'auto'
                },
                'Операция выполнена');
              this.scheduleDTO = new SheduleDTO();
              this.fioTeacher = "";
            }, error => {
              console.log(error.error.message);
              MainComponent.sendNotification('Расписание не создано', {
                  body: 'Ошибка при создании: ' + error.error.message + '!',
                  icon: 'icon.jpg',
                  dir: 'auto'
                },
                'Операция не выполнена');
            });
        } else {
          MainComponent.sendNotification('Вы не выбрали предмет', {
              body: 'Ошибка при создании: выберите предмет!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция не выполнена');
        }
      } else {
        MainComponent.sendNotification('Вы не выбрали класс', {
            body: 'Ошибка при создании: выберите класс!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      }
    } else {
      MainComponent.sendNotification('Вы не выбрали учителя', {
          body: 'Ошибка при создании: выберите учителя!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
    }
  }

  createClassNameWithTeacher() {
    if (this.selectedValueTeacherClass != null) {
      this.classroomDTO.classroomTeacherName = this.selectedValueTeacherClass.name;
      this.classroomDTO.classroomTeacherLastname = this.selectedValueTeacherClass.lastName;
      this.classroomDTO.classroomTeacherPatronymic = this.selectedValueTeacherClass.patronymic;

      if (this.class_name_pattern.test(this.classroomDTO.name)) {
        this.classroomDTOService.createClassroomDTO(this.classroomDTO)
          .subscribe(data => {
            console.log(data);
            MainComponent.sendNotification('Класс создан', {
                body: 'Класс ' + this.classroomDTO.name + ' создан!',
                icon: 'icon.jpg',
                dir: 'auto'
              },
              'Операция выполнена');
            this.classroomDTO = new ClassroomDTO();
            this.classroomDTOService.getClassroomDTOsList().subscribe(data => {
              this.classnames = data
            });
          }, error => {
            console.log(error);
            MainComponent.sendNotification('Класс не создан', {
                body: 'Ошибка при создании: ' + error.error.message + '!',
                icon: 'icon.jpg',
                dir: 'auto'
              },
              'Операция не выполнена');
          });
      } else {
        MainComponent.sendNotification('Ошибка в названии класса', {
            body: 'Ошибка при создании: название класса введено неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      }
    } else {
      MainComponent.sendNotification('Вы не выбрали учителя', {
          body: 'Ошибка при создании: выберите учителя!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена');
    }
  }

  blockUser() {
    this.userService.blockUser(this.loginForDel)
      .subscribe(data => {
        console.log(data);
        MainComponent.sendNotification('Пользователь заблокирован', {
            body: 'Пользователь ' + this.loginForDel + ' заблокирован!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
      }, error => {
        console.log(error);
        MainComponent.sendNotification('Пользователь не заблокирован', {
            body: 'Ошибка при блокировке: логин введен неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      });
  }

  unBlockUser() {
    this.userService.unblockUser(this.loginForDel)
      .subscribe(data => {
        console.log(data);
        MainComponent.sendNotification('Пользователь разблокирован', {
            body: 'Пользователь ' + this.loginForDel + ' разблокирован!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
      }, error => {
        console.log(error);
        MainComponent.sendNotification('Пользователь не разблокирован', {
            body: 'Ошибка при разблокировке: логин введен неверно!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция не выполнена');
      });
  }

  deleteUser() {
    this.userService.deleteUser(this.loginForDel)
      .subscribe(data => {
        console.log(data);
        MainComponent.sendNotification('Пользователь удален', {
            body: 'Пользователь ' + this.loginForDel + ' удален!',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена');
      }, error => {
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
