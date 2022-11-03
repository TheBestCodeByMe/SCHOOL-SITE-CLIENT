/*import * as url from 'url';*/

export class UserDTO {
    name: string;
    lastname: string;
    patronymic: string;
    email: string;
    login: string;
    password: string;
    role: string[];
    status: string;
    link: string; //url

/*  constructor(name: string, lastname: string, patronymic: string, email: string, login: string, password: string, role: string[], status: string, link: string) {
    this.name = name;
    this.lastname = lastname;
    this.patronymic = patronymic;
    this.email = email;
    this.login = login;
    this.password = password;
    this.role = role; // = ['role'];
    this.status = status;
    this.link = link;
  }*/
}
