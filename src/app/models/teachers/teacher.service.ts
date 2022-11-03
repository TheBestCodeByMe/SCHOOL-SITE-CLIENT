import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Teacher} from "./teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getTeacher(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTeacher(teacher: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/editUsers/createTeacher`, teacher);
  }

  updateTeacher(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getTeachersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/getAll`);
  }

  getTeacherFIO(teacher: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/getByFIO`, teacher);
  }

  getTeacherByUserId(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/getByUserId`, userId);
  }
}
