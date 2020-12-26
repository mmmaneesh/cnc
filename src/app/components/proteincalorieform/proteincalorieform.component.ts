import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-proteincalorieform',
  templateUrl: './proteincalorieform.component.html',
  styleUrls: ['./proteincalorieform.component.css']
})
export class ProteincalorieformComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<ProteincalorieformComponent>) { }

  ngOnInit() {
  }
  

  onNoClick(){
    this.dialogRef.close();
  }
  

}
