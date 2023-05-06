import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PupilTeacherDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getPupilTeacherDTOsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/editUsers/pupils/teachers/get`);
  }
}
