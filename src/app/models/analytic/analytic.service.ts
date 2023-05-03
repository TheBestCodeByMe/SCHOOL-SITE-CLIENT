import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
  private baseUrl = 'http://localhost:8080/api/v1/analytic';

  constructor(private http: HttpClient) { }

  getAnalytic(userId: string, sem: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by/user/get/${userId}/${sem}`);
  }
}
