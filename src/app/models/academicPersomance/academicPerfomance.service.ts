import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicPerfomanceService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getAcademicPerfomance(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAcademicPerfomance(academicPerfomance: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, academicPerfomance);
  }

  updateAcademicPerfomance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAcademicPerfomance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAcademicPerfomancesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
