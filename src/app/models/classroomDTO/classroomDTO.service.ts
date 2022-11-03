import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getClassroomDTO(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createClassroomDTO(classroom: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/editUsers/createClassroomDTO`, classroom);
  }

  updateClassroomDTO(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteClassroomDTO(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getClassroomDTOsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classroomDTO`);
  }
}
