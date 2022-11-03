import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getAttendance(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAttendance(attendance: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, attendance);
  }

  updateAttendance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAttendance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAttendancesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
