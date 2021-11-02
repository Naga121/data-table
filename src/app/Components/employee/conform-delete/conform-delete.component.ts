import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conform-delete',
  templateUrl: './conform-delete.component.html',
  styleUrls: ['./conform-delete.component.css']
})
export class ConformDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef:MatDialogRef<ConformDeleteComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false)
  }

}
