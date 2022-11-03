import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getCalendar(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCalendar(calendar: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, calendar);
  }

  updateCalendar(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCalendar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCalendarsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
