import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from "../models/jwtResponse/jwt-response";
import {LoginInfo} from "../models/login-info/login-info";
import {UserDTO} from "../models/userDTO/userDTO";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signIn';
  private signupUrl = 'http://localhost:8080/api/auth/signUp';

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: UserDTO): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
