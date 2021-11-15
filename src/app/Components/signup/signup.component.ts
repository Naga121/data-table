import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  employee: Employee[] = [];
  constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      mobile: ['', Validators.required]
    })
  }

  signUp() {
    this.http.post<Employee[]>("http://localhost:3000/Signup", this.form.value).subscribe((res: Employee[]) => {
      console.log(res);
      this.form.reset();
      this.toastr.success('Registation  Complite', 'Succress');
      this.router.navigate(['login']);
    });
  }

}
