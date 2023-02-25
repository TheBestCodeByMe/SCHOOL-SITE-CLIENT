import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Teacher} from "../models/teachers/teacher";
import {TeacherService} from "../models/teachers/teacher.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {ClassroomDTO} from "../models/classroomDTO/classroomDTO";
import {ClassroomDTOService} from "../models/classroomDTO/classroomDTO.service";

@Component({
  selector: 'app-main',
  templateUrl: './menu-director.component.html',
  styleUrls: ['./menu-director.component.css',
    './assetsMenuDirector/bootstrap/css/bootstrap.min.css'
  ]
})
export class MenuDirectorComponent implements OnInit {

  fioTeacher;
  qualification;
  teachers: Observable<Teacher[]>;
  receivedTeacher: Teacher | undefined;
  classrooms: Observable<ClassroomDTO[]>;
  password;

  ngOnInit() {
    this.reloadData();
  }

  constructor(private teacherService: TeacherService,
              private tokenStorage: TokenStorageService,
              private classroomDTOService: ClassroomDTOService,
              private router: Router) {
  }

  reloadData() {
    this.teacherService.getTeacherByUserId(this.tokenStorage.getIdUser())
      .subscribe({
        next:(data: any) => {this.receivedTeacher=data;
          this.fioTeacher=this.receivedTeacher.name + " " + this.receivedTeacher.lastName + " " + this.receivedTeacher.patronymic;
          this.qualification = this.receivedTeacher.qualification},
        error: error => {console.log(error)}
      });
   this.classrooms = this.classroomDTOService.getClassroomDTOsList();
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }

  pass() {
    this.password = this.teacherService.getChangePasswordInformation();
  }
}
