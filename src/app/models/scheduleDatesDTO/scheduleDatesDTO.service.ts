import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDatesDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getScheduleDates(subj: string, classname: string, user: string, sem: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dates/${subj}/${classname}/${user}/${sem}`);
  }
}
