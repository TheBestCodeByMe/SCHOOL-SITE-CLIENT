import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryBySubjectDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getDiaries(subject: string, classname: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/diary/getDiaries/${classname}/${subject}`);
  }
}
