import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from "../models/jwtResponse/jwt-response";
import {LoginInfo} from "../models/login-info/login-info";
import {UserDTO} from "../models/userDTO/userDTO";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_USER_KEY ='AutIdUser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveIdUser(idUser: string) {
    window.sessionStorage.removeItem(ID_USER_KEY);
    window.sessionStorage.setItem(ID_USER_KEY, idUser);
  }

  public getIdUser(): string {
    return sessionStorage.getItem(ID_USER_KEY);
  }

  public saveAuthorities(authorities: string) {
    console.log('saveAuthorities');
    console.log(authorities);
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      console.log('test');
      console.log(sessionStorage.getItem(AUTHORITIES_KEY));
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }
}
