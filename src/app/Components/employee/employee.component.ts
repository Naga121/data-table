import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee.model';
import { DelectService } from 'src/app/Service/delect.service';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  form: FormGroup;

  submitted: boolean = false;
  postData: boolean;
  upDate: boolean;

  empData:any;
  
  employeeModel:Employee =new  Employee();

  search: string;
  p: number = 1;

  

  constructor(public es: EmployeeService, private fb: FormBuilder, private toastr: ToastrService,private ds:DelectService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      eName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      skill: ['', Validators.required],
      expYear: ['', Validators.required],

    });
    this.getEmpData();
  }

  get formControl() {
    return this.form.controls;
  }




  clickEmp() {
    this.form.reset();
    this.postData = true;
    this.upDate = false;
  }

  postEmpData() {
    this.submitted = true;
    this.employeeModel = this.form.value;
    this.submitted = true;
    this.es.postData(this.employeeModel).subscribe(
      () => {
        let ref = document.getElementById('cancle')
        ref.click();
        this.form.reset();
        this.getEmpData();
        this.toastr.success('Your data is saved', 'done');
      },
      err => {
        this.toastr.error("your data is Error", 'plese check');
        console.log(err);
        alert('error')
      }
    )
  }

  getEmpData() {
    this.es.getData().subscribe(
      (res) => { this.empData = res }
    )
  }

  deleteEmp(obj: any) {
    // this.confirm = confirm(`Do you want to delete`);
    // if (this.confirm == true) {
    //   this.es.deletData(obj.id).subscribe(
    //     () => {
    //       this.getEmpData();
    //       this.toastr.success('Your data is deleted', 'Delete')
    //     }
    //   )
    // }
    this.ds.openConfirmDialog('Do you want to delete').afterClosed().subscribe(res=>{
      if(res== true){
        this.es.deletData(obj.id).subscribe( () => {
          this.getEmpData();
          this.toastr.success('Your data is deleted', 'Delete')
        })
      }
    });
  }

  editEmp(obj: any) {
    this.postData = false;
    this.upDate = true;

    this.employeeModel.id = obj.id;
    this.form.controls['eName'].setValue(obj.eName);
    this.form.controls['email'].setValue(obj.email);
    this.form.controls['mobile'].setValue(obj.mobile);
    this.form.controls['gender'].setValue(obj.gender);
    this.form.controls['role'].setValue(obj.role);
    this.form.controls['skill'].setValue(obj.skill);
    this.form.controls['expYear'].setValue(obj.expYear);

  }

  upDateEmp() {
    // this.employeeModel = this.form.value;  
    this.employeeModel.eName = this.form.value.eName;
    this.employeeModel.email = this.form.value.email;
    this.employeeModel.mobile = this.form.value.mobile;
    this.employeeModel.gender = this.form.value.gender;
    this.employeeModel.role = this.form.value.role;
    this.employeeModel.skill = this.form.value.skill;
    this.employeeModel.expYear = this.form.value.expYear;

    this.submitted = true;

    this.es.putData(this.employeeModel,this.employeeModel.id).subscribe(
      () => {
        this.form.reset();
        let ref = document.getElementById('cancle')
        ref.click();
        this.getEmpData();
        this.toastr.success('Your data is UpDated', 'UpDate');
      }
    )
  }

}
