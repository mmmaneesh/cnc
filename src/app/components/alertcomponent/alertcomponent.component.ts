import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alertcomponent',
  templateUrl: './alertcomponent.component.html',
  styleUrls: ['./alertcomponent.component.css']
})
export class AlertcomponentComponent implements OnInit {

  textvalue : string  = '';
  constructor(private dialogRef : MatDialogRef<AlertcomponentComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.textvalue = data.alerttext;
   }

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
