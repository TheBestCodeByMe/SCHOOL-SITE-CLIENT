import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectDTOService {
  private baseUrl = 'http://localhost:8080/api/v1/editUsers';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSubjects`);
  }
}
