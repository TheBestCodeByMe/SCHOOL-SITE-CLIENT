import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PupilDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getPupilDTO(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPupilDTO(pupilDTO: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/editUsers/createPupilDTO`, pupilDTO);
  }

  updatePupilDTO(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletePupilDTO(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPupilDTOsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/editUsers`);
  }

  getPupilDTOByUserId(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/pupil/getByUserId`, userId);
  }
}
