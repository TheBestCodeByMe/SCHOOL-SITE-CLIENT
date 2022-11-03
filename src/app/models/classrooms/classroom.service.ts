import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getClassroom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createClassroom(classroom: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, classroom);
  }

  updateClassroom(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteClassroom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getClassroomsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
