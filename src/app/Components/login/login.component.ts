import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm: FormGroup;
  employee: Employee;
  msgError: string;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private es: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  login() {
    let email = this.loginForm.value.email;
    let pwd = this.loginForm.value.pwd;
    if (email != "" && pwd !="") {
      this.es.getLogin().subscribe((res: Employee[]) => {
        console.log("success",res);
        this.router.navigate(['home'])
      })
    }
    //  this.http.get<Employee[]>("http://localhost:3000/Signup").subscribe((res: Employee[]) => {
    //    const emp = res.find((id: Employee) => {
    //      return id.email === this.loginForm.value.email && id.pwd === this.loginForm.value.pwd;
    //    });
    //    if (emp) {
    //      this.toastr.success('Login Success', 'Success');
    //      this.loginForm.reset();
    //      this.router.navigate(['home']);
    //    } else {
    //      this.msgError = `Email & Password is incorrect`;
    //    }
    //  }, err => {
    //    console.log(err);
    //  })
  }


}
