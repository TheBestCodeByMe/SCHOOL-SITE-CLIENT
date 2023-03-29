import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PupilInClassDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getPupilsInClassDTO(classname: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pupil/getByClass/${classname}`);
  }
}
