import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../models/userDTO/userDTO";
import {UserService} from "../models/users/user.service";
import {UserDTOService} from "../models/userDTO/userDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Observable, take} from "rxjs";
import {MainComponent} from "../main/main.component";


@Component({
  selector: 'app-main',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css',
    './assetsUpdateUser/css/UpU-Form-with-Photo.css',
    './assetsUpdateUser/css/styles.css'
  ]
})
export class UpdateUsersComponent implements OnInit {

  userDTO: UserDTO = new UserDTO();
  users: Observable<UserDTO>;
  errorMessage;

  constructor(private userServiceDTO: UserDTOService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
  }

  updateUser() {
    if(this.userDTO.name!="" || this.userDTO.lastname!="" || this.userDTO.patronymic!="") {
      this.userServiceDTO.updateUserDTO(this.tokenStorage.getIdUser(), this.userDTO).subscribe(
        data => {
          console.log(data);
          MainComponent.sendNotification('Данные обновлены', {
              body: 'Данные отредактированы!',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция выполнена')
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          MainComponent.sendNotification('Неверные данные', {
              body: 'Введены неверные данные! Ошибка: ' + error.error.message,
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Проверьте введенные данные')
        }
      );
    } else {
      MainComponent.sendNotification('Сначала выведите данные', {
          body: 'Данные не отредактированы!',
          icon: 'icon.jpg',
          dir: 'auto'
        },
        'Операция не выполнена')
    }
  }

  reloadData() {
    this.users = this.userServiceDTO.getUserDTO(this.tokenStorage.getIdUser());
    this.users.forEach(value => this.userDTO = value);
  }
}
