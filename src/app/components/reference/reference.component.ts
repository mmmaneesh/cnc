import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<ReferenceComponent>) { }

  ngOnInit() {

  }

  
  onNoClick(){
    this.dialogRef.close();
  }

}
