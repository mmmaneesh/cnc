import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createchecklist',
  templateUrl: './createchecklist.component.html',
  styleUrls: ['./createchecklist.component.css']
})
export class CreatechecklistComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<CreatechecklistComponent>) { }

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
