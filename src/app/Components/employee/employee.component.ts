import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public form: FormGroup;
  public employee: Employee[] = [];
  public submitted: boolean = false;
  public postDataButtion: boolean;
  public upDateButtion: boolean;
  public search: string;
  public p: number = 1;
  public employeeId: any;

  constructor(public es: EmployeeService, private fb: FormBuilder, private toastr: ToastrService) { }

  get formControl() {
    return this.form.controls;
  }
  
  clickEmployee() {
    this.form.reset();
    this.postDataButtion = true;
    this.upDateButtion = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      eName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      skill: ['', Validators.required],
      expYear: ['', Validators.required]
    });
    this.getEmpData();
  }

  postEmpData() {
    this.submitted = true;
    this.employee = this.form.value;
    this.es.postData(this.employee).subscribe(
      () => {
        this.form.reset();
        this.getEmpData();
        this.toastr.success('Your data is saved', 'done');
      }, err => {
        this.toastr.error("your data is Error", 'plese check');
        console.log(err);
      }
    );
  }

  getEmpData() {
    this.es.getData().subscribe((res: Employee[]) => {
      this.employee = res;
    });
  }

  deleteEmp(obj) {
    if (confirm('Do You Want to Delete ?') == true) {
      this.es.deletData(obj.id).subscribe(() => {
        this.getEmpData();
        this.toastr.success('Your Data is Deleted', 'Delet')
      });
    }
  }

  editEmp(obj) {
    this.postDataButtion = false;
    this.upDateButtion = true;
    this.employeeId = obj.id;
    this.form.controls['eName'].setValue(obj.eName);
    this.form.controls['email'].setValue(obj.email);
    this.form.controls['mobile'].setValue(obj.mobile);
    this.form.controls['gender'].setValue(obj.gender);
    this.form.controls['role'].setValue(obj.role);
    this.form.controls['skill'].setValue(obj.skill);
    this.form.controls['expYear'].setValue(obj.expYear);
  }

  upDateEmp() {
    this.submitted = true;
    this.es.putData(this.form.value, this.employeeId).subscribe(() => {
      this.form.reset();
      this.getEmpData();
      this.toastr.success('Your data is UpDated', 'UpDate');
    });
  }

}
