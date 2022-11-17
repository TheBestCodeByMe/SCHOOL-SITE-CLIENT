import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../models/teachers/teacher.service";
import {Router} from "@angular/router";
import {Teacher} from "../models/teachers/teacher";
import {TokenStorageService} from "../auth/token-storage.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './menu-teacher.component.html',
  styleUrls: ['./menu-teacher.component.css',
    './assets/bootstrap/css/bootstrap.min.css'
  ]
})
export class MenuTeacherComponent implements OnInit {

  fioTeacher;
  qualification;
  teachers: Observable<Teacher[]>;
  teacher: Teacher = new Teacher();

  ngOnInit() {
    this.reloadData();
  }

  constructor(private teacherService: TeacherService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  reloadData() {
    this.teacherService.getTeacherByUserId(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.fioTeacher = data.name + " " + data.lastName + " " + data.patronymic;
        this.qualification = data.qualification
      });
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }

}
