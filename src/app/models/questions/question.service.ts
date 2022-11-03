import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getQuestion(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getQuestionDetails/${code}`);
  }

  createQuestion(question: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/askQuestion/addQuestion`, question);
  }

  updateQuestion(value: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateQuestion`, value);
  }

  deleteQuestion(code: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }

  getQuestionsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
