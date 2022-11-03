import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheduleDTOService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getSheduleDTO(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSheduleDTO(sheduleDTO: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/editUsers/createSheduleDTO`, sheduleDTO);
  }

  updateSheduleDTO(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteSheduleDTO(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSheduleDTOsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getSchedulePupil(userId: string, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getScheduleDTOPupil/${userId}/${date}`);
  }
}
