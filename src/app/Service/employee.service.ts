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
  public url1 = "http://localhost:3000/Signup";
  
  constructor(private http: HttpClient) { }


  // SignUp-Post Meyhod
  postSignup(obj:Employee[]):Observable<Employee[]>{
    return this.http.post<Employee[]>(this.url1,obj).pipe(
      map((res)=>{
        console.log("Register",res);
        return res;
      })
    )
  }
  //SignUp-Get Method
  getSignup(){
    return this.http.get<Employee[]>(this.url1).pipe(
      map((res)=>{
        return res
      })
    )
  }
   //Get-Login Method
   getLogin(email): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url1}?email=${email}`).pipe(
      map((res) => {
        console.log("loginerror", res);
        return res;
      })
    )

  }

  // Post Method
  postData(obj: Employee[]): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.url, obj).pipe(
      map((res) => {
        console.log("fghdgh",res);
        return res
      })
    );
  }
  // Get Method
  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url).pipe(
      map((res) => {
        return res
      })
    );
  }

  // Put method
  putData(obj: Employee, id: number): Observable<Employee[]> {
    return this.http.put<Employee[]>(`${this.url}/` + id, obj).pipe(
      map((res) => {
        return res
      })
    );
  }

  deletData(id: Employee): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.url}/` + id).pipe(
      map((res) => {
        return res
      })
    );
  }
}
