import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  getLoginInfo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLoginInfo(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createUserDTO`, user);
  }

  updateLoginInfo(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteLoginInfo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getLoginInfosList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
