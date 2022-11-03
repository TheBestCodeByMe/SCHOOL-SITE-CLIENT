import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {Pupil} from "../models/pupils/pupil";
import {PupilService} from "../models/pupils/pupil.service";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";
import {PupilDTO} from "../models/pupilDTO/pupilDTO";


@Component({
  selector: 'app-main',
  templateUrl: './menu-student.component.html',
  styleUrls: ['./menu-student.component.css',
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/fonts/font-awesome.min.css'
  ]
})
export class MenuStudentComponent implements OnInit {

  fioPupil;
  fioMom;
  fioDad;
  email;
  className;
  students: Observable<Pupil[]>;
  pupil: PupilDTO = new PupilDTO();

  ngOnInit() {
    this.reloadData();
  }

  constructor(private pupilService: PupilDTOService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  reloadData() {
    this.pupilService.getPupilDTOByUserId(this.tokenStorage.getIdUser())
      .subscribe(data => {
        console.log("пришло это " + data);
        this.fioPupil = data.name + " " + data.lastname + " " + data.patronymic;
        this.className = data.className;
        this.fioMom = data.nameMom + " " + data.lastnameMom + " " + data.patronymicMom;
        this.fioDad = data.nameDad + " " + data.lastnameDad + " " + data.patronymicDad;
        this.email = data.email;
      });
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }
}
