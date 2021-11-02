import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConformDeleteComponent } from '../Components/employee/conform-delete/conform-delete.component';

@Injectable({
  providedIn: 'root'
})
export class DelectService {

  constructor(public dialog:MatDialog ) { }

  openConfirmDialog(msg){
    return this.dialog.open(ConformDeleteComponent,{
      width:'390px',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      position:{top:'10px'},
      data:{
        message:msg
      }
    })
  }
}
