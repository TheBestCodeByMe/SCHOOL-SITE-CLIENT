import {Component, OnInit} from '@angular/core';
import {User} from '../models/users/user';
import {Router} from '@angular/router';
import {UserService} from '../models/users/user.service';
import {Pupil} from "../models/pupils/pupil";
import {UserDTO} from "../models/userDTO/userDTO";
import {UserDTOService} from "../models/userDTO/userDTO.service";
import {AuthService} from "../auth/auth.service";
import {MainComponent} from "../main/main.component";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";
import {PupilTeacherDTOService} from "../models/pupilTeachers/pupilTeacherDTO.service";
import {PupilTeacherDTOResponse} from "../models/pupilTeachers/pupilTeacherDTOResponse";
import {Teacher} from "../models/teachers/teacher";
import {PupilTeacherDTO} from "../models/pupilTeachers/pupilTeacherDTO";
import {ScheduleDatesDTO} from "../models/scheduleDatesDTO/scheduleDatesDTO";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css',
    '/assetsReg/css/Registration-Form-with-Photo.css']
})
export class CreateUserComponent implements OnInit {

  pupilTeacherList: PupilTeacherDTOResponse = new PupilTeacherDTOResponse();
  selectedTeamTeacherPupil: PupilTeacherDTO = null;
  selectedValueTeacherPupil: PupilTeacherDTO = null;
  user: User = new User();
  submitted = false;
  repeatPassword
  pupil: Pupil = new Pupil();
  userDTO: UserDTO = new UserDTO();
  check;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService,
              private userDTOService: UserDTOService,
              private pupilTeacherDTOService: PupilTeacherDTOService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.pupilTeacherDTOService.getPupilTeacherDTOsList().subscribe(data => {
      this.pupilTeacherList = data;
    });
  }

  createUser(): void {
    this.submitted = false;
    this.user = new User();
    this.userDTO = new UserDTO();
  }

  public selectedOptionChanged(pupilTeacherDTO: PupilTeacherDTO): void {
    console.log(pupilTeacherDTO);
    this.userDTO.email = pupilTeacherDTO.email
    this.check = this.selectedValueTeacherPupil.isPupil
  }

  // дописать, если такой найден, то создать
  save() {
    if (this.check) {
      this.userDTO.role = ['pupil'];
    } else {
      this.userDTO.role = ['teacher'];
    }
    this.userDTO.name = this.selectedValueTeacherPupil.name
    this.userDTO.lastname = this.selectedValueTeacherPupil.lastName
    this.userDTO.patronymic = this.selectedValueTeacherPupil.patronymic
    this.userDTO.status = "ACTIVE";

    // возвращает в имени сущности строку с комментарием ошибки, если что-то не так
    // возвращает сущность, если всё так

   console.log(this.userDTO);

   this.authService.signUp(this.userDTO).subscribe(
      data => {
        console.log(data);
        MainComponent.sendNotification('Пользователь' + this.userDTO.login +' зарегистрирован', {
            body: 'Все прошло успешно :)',
            icon: 'icon.jpg',
            dir: 'auto'
          },
          'Операция выполнена')
        this.ngOnInit()
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.userDTO = new UserDTO();
        this.repeatPassword="";
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        MainComponent.sendNotification('Неверные данные', {
          body: 'Введены неверные данные! Ошибка: '+ this.errorMessage,
          icon: 'icon.jpg',
          dir: 'auto'
        },
          'Операция не выполнена')
        this.isSignUpFailed = true;
      }
    );

    //this.gotoMain();
  }

  onSubmit() {
    if (this.userDTO.password == this.repeatPassword) {
      this.submitted = true;
      this.save();
    } else {
      console.log("Пароли не совпадают");
      this.errorMessage = "Пароли не совпадают";
      MainComponent.sendNotification('Неверные данные', {
          body: 'Введены неверные данные! Ошибка: '+ this.errorMessage,
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена')
    }
  }

  gotoMain() {
    this.router.navigate(['/main']);
  }
}
