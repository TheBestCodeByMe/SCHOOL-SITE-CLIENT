import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Parents} from "../parents/parents";

@Injectable({
  providedIn: 'root'
})
export class PupilService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getPupil(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
// parentsId: number
  createPupil(pupil: Object): Observable<Object> {
    // @ts-ignore
    return this.http.post(`${this.baseUrl}/editUsers/createPupil`, pupil);
  }

  updatePupil(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletePupil(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPupilsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
