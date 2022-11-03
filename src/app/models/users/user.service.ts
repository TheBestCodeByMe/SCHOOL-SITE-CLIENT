import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  blockUser(login: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/editUsers/blockUser/${login}`, {responseType: 'text'});
  }

  unblockUser(login: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/editUsers/unblockUser/${login}`, {responseType: 'text'});
  }

  deleteUser(login: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/editUsers/deleteUser/${login}`, {responseType: 'text'});
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

}
