import {Component, OnInit} from '@angular/core';
import {Teacher} from "../models/teachers/teacher";
import {TeacherService} from "../models/teachers/teacher.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css',
    './assets/bootstrap/css/bootstrap.min.css'
  ]
})
export class EmployeeComponent implements OnInit {

  teacher: Teacher = new Teacher();
  fioTeacher = "";
  teachers: Observable<Teacher[]>;
  allFlag = true;

  constructor(private teacherService: TeacherService) {
  }

  ngOnInit() {
  }

  viewTeacher() {
    this.allFlag = this.fioTeacher == "";

    if (this.allFlag) {
      this.teachers = this.teacherService.getTeachersList();
    } else {
      const tempTeacher = this.fioTeacher.split(" ");
      this.teacher.name = tempTeacher[1];
      this.teacher.lastName = tempTeacher[0];
      this.teacher.patronymic = tempTeacher[2];
      this.teachers = this.teacherService.getTeacherFIO(this.teacher);
    }

    this.teacher = new Teacher();
  }

}
