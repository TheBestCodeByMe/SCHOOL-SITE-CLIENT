import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtResponseService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  getJwtResponse(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createJwtResponse(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createUserDTO`, user);
  }

  updateJwtResponse(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteJwtResponse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getJwtResponsesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
