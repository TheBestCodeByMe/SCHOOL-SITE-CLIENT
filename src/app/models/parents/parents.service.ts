import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";
import {Parents} from "./parents";

@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  private baseUrl = 'http://localhost:8080/api/v1/editUsers';

  constructor(private http: HttpClient) { }

  getParents(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createParents(parent: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/createParents`, parent);
  }

  updateParents(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteParents(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getParentsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getParentsByFIO(parents: Object) {

  }
}
