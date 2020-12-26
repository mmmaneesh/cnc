import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-nutricpoints',
  templateUrl: './nutricpoints.component.html',
  styleUrls: ['./nutricpoints.component.css']
})
export class NutricpointsComponent implements OnInit {

  datalabel : string = '';
  datavalue : any;

  constructor(private dialogRef : MatDialogRef<NutricpointsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.datalabel = data.datalabel;
   }

  ngOnInit() {
  }

  submitdata(){
    this.dialogRef.close({datavalue:this.datavalue});
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
