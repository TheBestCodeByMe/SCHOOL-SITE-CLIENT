import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getSubject(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSubject(subject: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/editUsers/createSubject`, subject);
  }

  updateSubject(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSubjectsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
