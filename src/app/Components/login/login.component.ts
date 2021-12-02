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
      this.es.getLogin(email).subscribe((res: Employee[]) => {
        if(res.length !=0){
          if(pwd==res[0].pwd){
          this.router.navigate(['home']);
          this.toastr.success('login Success','Login')
          }else
          alert("error")
        }else{
          alert('please Signin')
        }
      })
    }

  }


}
