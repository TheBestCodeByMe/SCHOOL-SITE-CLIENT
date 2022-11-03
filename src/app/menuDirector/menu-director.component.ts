import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/fonts/font-awesome.min.css'
  ]
})
export class MenuDirectorComponent implements OnInit {

  fioTeacher;
  qualification;
  teachers: Observable<Teacher[]>;
  teacher: Teacher = new Teacher();
  classrooms: Observable<ClassroomDTO[]>;

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
      .subscribe(data => {
        this.fioTeacher = data.name + " " + data.lastName + " " + data.patronymic;
        this.qualification = data.qualification
      });
   this.classrooms = this.classroomDTOService.getClassroomDTOsList();
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }

}
