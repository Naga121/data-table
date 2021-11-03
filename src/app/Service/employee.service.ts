import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public url = "http://localhost:3000/Employee";
  constructor(private http: HttpClient) { }

  // Post Method
  postData(obj: Employee[]): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.url, obj).pipe(
      map((res: any) => {
        return res
      })
    );
  }
  // Get Method
  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  putData(obj: Employee, id: number): Observable<Employee[]> {
    return this.http.put<Employee[]>(`${this.url}/` + id, obj).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  deletData(id: Employee): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.url}/` + id).pipe(
      map((res: any) => {
        return res
      })
    );
  }
}
