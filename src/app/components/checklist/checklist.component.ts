import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<ChecklistComponent>) { }

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
