import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getCreditList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/getcredit`);
  }
  getDebitList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/getdebit`);
  }
}
