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
import {ClassroomService} from "../models/classrooms/classroom.service";
import {Subject} from "../models/subjects/subject";
import {SubjectService} from "../models/subjects/subject.service";
import {SheduleDTO} from "../models/sheduleDTO/sheduleDTO";
import {SheduleDTOService} from "../models/sheduleDTO/sheduleDTO.service";
import {ClassroomDTO} from "../models/classroomDTO/classroomDTO";
import {ClassroomDTOService} from "../models/classroomDTO/classroomDTO.service";


@Component({
  selector: 'app-main',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css',
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/css/styles.css',
    './assets/css/Registration-Form-with-Photo.css'
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
  sheduleDTO: SheduleDTO = new SheduleDTO();
  loginForDel;

  constructor(private userService: UserService,
              private pupilDTOService: PupilDTOService,
              private pupilService: PupilService,
              private parentService: ParentsService,
              private teacherService: TeacherService,
              private classroomService: ClassroomService,
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
      .subscribe(data => console.log(data), error => console.log(error));

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
    // возвращает null, если не сохранено
    // сущность, если сохранено
    this.teacherService.createTeacher(this.teacher)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  createSubject() {
    // возвращает null, если не сохранено
    // сущность, если сохранено
    this.subjectService.createSubject(this.subject)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  createShedule() {
    const tempTeacher = this.fioTeacher.split(" ");
    this.sheduleDTO.nameTeacher = tempTeacher[1];
    this.sheduleDTO.lastnameTeacher = tempTeacher[0];
    this.sheduleDTO.patronymicTeacher = tempTeacher[2];

    // возвращает в имени предмета строку с комментарием ошибки, если что-то не так
    // возвращает сущность, если всё так
    this.sheduleDTOService.createSheduleDTO(this.sheduleDTO)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  createClassNameWithTeacher() {
    // возвращает текст в имени класса, если такой класс уже есть или такого преподавателя нет
    // возвращает сущность, если всё так
    this.classroomDTOService.createClassroomDTO(this.classroomDTO)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  // В следующих 3 методах вся информация возвращается текстом
  blockUser() {
    this.userService.blockUser(this.loginForDel)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  unBlockUser() {
    this.userService.unblockUser(this.loginForDel)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  deleteUser() {
    this.userService.deleteUser(this.loginForDel)
      .subscribe(data => console.log(data), error => console.log(error));
  }
}
