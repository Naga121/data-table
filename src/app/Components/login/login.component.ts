import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  employee: Employee;
  msgError: string;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  login() {
    this.http.get<Employee[]>("http://localhost:3000/Signup").subscribe((res: Employee[]) => {
      const emp = res.find((id: Employee) => {
        return id.email === this.form.value.email && id.pwd === this.form.value.pwd;
      });
      if (emp) {
        this.toastr.success('Login Success', 'Success');
        this.form.reset();
        this.router.navigate(['home']);
      } else {
        this.msgError = `Email & Password is incorrect`;
      }
    }, err => {
      console.log(err);
    })
  }

}
