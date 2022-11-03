import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../models/userDTO/userDTO";
import {UserService} from "../models/users/user.service";
import {UserDTOService} from "../models/userDTO/userDTO.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Observable, take} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css',
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/css/Registration-Form-with-Photo.css',
    './assets/css/styles.css'
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
    this.userServiceDTO.updateUserDTO(this.tokenStorage.getIdUser(), this.userDTO).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  reloadData() {
    this.users = this.userServiceDTO.getUserDTO(this.tokenStorage.getIdUser());
    this.users.forEach(value => this.userDTO = value);
  }
}
