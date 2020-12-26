import { NutricpointsComponent } from './../nutricpoints/nutricpoints.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-nutricscore',
  templateUrl: './nutricscore.component.html',
  styleUrls: ['./nutricscore.component.css']
})
export class NutricscoreComponent implements OnInit {

  Age: number = 0;
  Agepoint: number = 0;
  Appachescore : number = 0;
  AppachescorePoint: number = 0;
  Sofascore : number = 0;
  Sofascorepoint : number = 0;
  NoOfComorbidities: number = 0;
  NoOfComorbiditiesPoint : number = 0;
  Icudays : number = 0;
  IcudaysPoint : number = 0;
  IL6 : number = 0;
  IL6Point : number = 0;
  NutricScore : number = 0;

  constructor(private dialogRef : MatDialogRef<NutricscoreComponent>, @Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog) {
    this.Age = data.Age;
      this.Appachescore = data.Appachescore;
      this.Sofascore = data.Sofascore;
      this.Icudays = data.Icudays;
   }

  ngOnInit() {
  }
  

  onNoClick(){
    this.dialogRef.close({Nutricscore:this.NutricScore});
  }

  IL6click(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      datalabel: 'IL6'
    };
    let dialogref = this.dialog.open(NutricpointsComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      this.IL6 = res.datavalue;
      this.calculateNutricScore();
      // this.SofaScoredata = res.data;
      /* this.bottomLabel = res.data;
      this.needleValue = res.data; */
    });
  }

  comorbiditiesclick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      datalabel: 'Co-morbidities'
    };
    let dialogref = this.dialog.open(NutricpointsComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      this.NoOfComorbidities = res.datavalue;
      this.calculateNutricScore();
      // this.SofaScoredata = res.data;
      /* this.bottomLabel = res.data;
      this.needleValue = res.data; */
    });
  }

  newnutricscore(){
    
    this.dialogRef.close({Nutricscore:this.NutricScore});
  }

  calculateNutricScore(){
    if(this.Age <50){
      this.Agepoint = 0;
    }else if(this.Age >= 50 && this.Age < 75){
      this.Agepoint = 1;
    }else if(this.Age >= 75){
      this.Agepoint = 2;
    }

    if(this.Appachescore < 15){
      this.AppachescorePoint = 0;
    }else if(this.Appachescore >= 15 && this.Appachescore < 20){
      this.AppachescorePoint = 1;
    }else if(this.Appachescore >= 20 && this.Appachescore < 28){
      this.AppachescorePoint = 2;
    }else if(this.Appachescore >= 28){
      this.AppachescorePoint = 3;
    }

    if(this.Sofascore <6){
      this.Sofascorepoint = 0;
    }else if(this.Sofascore >= 6 && this.Sofascore < 10){
      this.Sofascorepoint = 1;
    }else if(this.Sofascore >= 10){
      this.Sofascorepoint = 2;
    }

    if(this.NoOfComorbidities >= 0 && this.NoOfComorbidities <= 1){
      this.NoOfComorbiditiesPoint = 0;
    }else if(this.NoOfComorbidities >= 2 ){
      this.NoOfComorbiditiesPoint = 1;
    }

    if(this.Icudays >= 0 && this.Icudays < 1){
      this.IcudaysPoint = 0;
    }else if(this.Icudays >= 1 ){
      this.IcudaysPoint = 1;
    }

    if(this.IL6 >= 0 && this.IL6 < 400){
      this.IL6Point = 0;
    }else if(this.IL6 >= 400 ){
      this.IL6Point = 1;
    }

    this.NutricScore = this.Agepoint + this.AppachescorePoint + this.Sofascorepoint + this.IL6Point + this.IcudaysPoint 
    + this.NoOfComorbiditiesPoint;

  }

}
