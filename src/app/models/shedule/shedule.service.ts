import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheduleService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getShedule(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createShedule(shedule: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, shedule);
  }

  updateShedule(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteShedule(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getShedulesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
