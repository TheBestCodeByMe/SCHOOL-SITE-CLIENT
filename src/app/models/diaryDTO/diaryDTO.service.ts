import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryDTOService {
  private baseUrl = 'http://localhost:8080/api/v1/diary';

  constructor(private http: HttpClient) {
  }

  createAttendanceAndAcademicPerformance(attendance: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addAttendanceAndAcademicPerformance`, attendance);
  }

  getDiaryPupil(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getByUserId/${userId}`);
  }

  getDiaryPupilByParams(userId: string, param: string, flag: boolean, sem: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by/user-date-subject/get/${userId}/${param}/${flag}/${sem}`);
  }

  getInfoPupil(classForSearch: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllAboutPupil/${classForSearch}`);
  }

  getAttendance(userId: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/getNumbAttendance/${userId}`, {responseType: "text"});
  }

  getAverageGrade(userId: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/getAverageGrade/${userId}`, {responseType: "text"});
  }

  getSaveGrades(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSaveGrades/${userId}`);
  }
}
