import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  private apiUrl = environment.apiUrl;  // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employee/add`, employeeData);
  }
  addAchievement(achievementData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employee/achievement`, achievementData);
  }
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/getemployees`);
  }
  getAchievement(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/getachievement`);
  }
  addTransactionCredit(pointData: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/employee/addPoints`,pointData);
  }
  addTransactionCredit1(pointData: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/employee/addreward`,pointData);
  }
  getTransactionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/getcredit`);
  }
  getEmployeePerformance(employeeId:number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/employee/getperformance`,employeeId);
  }
  getEmployeeDetails(employeeId:number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/employee/getDetails`,employeeId);
  }
  getTopPerformers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/getbestemployees`);
  }

  getMyOrders(employeeId:number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/employee/getmyorders`,employeeId);
  }

  getCountOfAwards(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/employee/getawardcount`);
  }

}
