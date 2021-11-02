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

  postData(obj: any): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.url, obj).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  putData(obj: any, id: number): Observable<Employee[]> {
    return this.http.put<Employee[]>("http://localhost:3000/Employee/"+ id,obj).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  deletData(id: any): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.url}/` + id).pipe(
      map((res: any) => {
        return res
      })
    );
  }
}
