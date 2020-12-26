import { AnthropometryabwComponent } from './../anthropometryabw/anthropometryabw.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrModule } from 'ngx-toastr';
import {MAT_DIALOG_DATA} from "@angular/material";
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-anthropometry',
  templateUrl: './anthropometry.component.html',
  styleUrls: ['./anthropometry.component.css']
})
export class AnthropometryComponent implements OnInit {

  Gender: number;
  Height: number;
  IBW: number;
  BMI:number;
  MRNO: number;
  responseData: any;
  BEDNO:number;
  NAME:string= '';
  AGE:number;
  GENDERDATA: string = '';
  isIBW:boolean = true;
  isABW:boolean = false;
  IDEALCAL: number;
  IDEALPROTEIN: number;
  TARGETCAL: number;
  TARGETPROTEIN: number;
  bedPointone: number;
  bedPointtwo: number;
  bedPointthree: number;
  bedPointfour: number;
  bedPointonechange: number;
  bedPointtwochange: number;
  bedPointthreechange: number;
  bedPointfourchange: number;
  abwPointone: string = '';
  abwPointtwo: string = '';
  abwPointthree: string = '';
  abwPointfour: string = '';
  totalbedPoint: number = 0;
  totalabwpoint: number = 0;
  totalabw: string = '';

  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<AnthropometryComponent>, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog) {
      this.MRNO = data.MRNO;
      this.BEDNO = data.BEDNO;
      this.AGE = data.AGE;
      this.NAME = data.NAME;
      this.GENDERDATA = data.GENDER;
      
     }


  ngOnInit() {
  }
  


  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.GENDERDATA == 'MALE'){
      this.Gender = 0;
    }else{
      this.Gender = 1;
    }
    this.http.get(this.rootURL+ '/GetAnthropometryCalculation', 
      {params : { MRNO: this.MRNO.toString(),  Height : this.Height.toString(), Gender: this.Gender.toString(), 
      AGE: this.AGE.toString(), ABW: '0', Enteredby: '8197' } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        //this.IBW = this.responseData[0].IBW;
        //this.BMI = this.responseData[0].BMI;
        this.dialogRef.close({data:this.responseData});
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 
  }

  ABWClick(){
    this.isIBW = false;
    this.isABW = true;
    /* const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      NAME: this.NAME,
      AGE: this.AGE,
      GENDER: this.GENDERDATA
    };
    let dialogref = this.dialog.open(AnthropometryabwComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      console.log('after closes anthropometry');
      console.log(res);
      this.IBW = res.data.IBW;
      this.BMI = res.data.BMI;
    }); */
  }

  IBWClick(){
    this.isABW = false;
    this.isIBW = true;
  }

  bedonechange(){
    this.totalbedPoint = parseInt(this.bedPointone.toString()) + parseInt(this.bedPointtwo.toString()) 
    + parseInt(this.bedPointthree.toString()) + parseInt(this.bedPointfour.toString());
  }

  bedtwochange(){
    this.totalbedPoint = parseInt(this.bedPointone.toString()) + parseInt(this.bedPointtwo.toString()) 
    + parseInt(this.bedPointthree.toString()) + parseInt(this.bedPointfour.toString());
  }

  bedthreechange(){
    this.totalbedPoint = parseInt(this.bedPointone.toString()) + parseInt(this.bedPointtwo.toString()) 
    + parseInt(this.bedPointthree.toString()) + parseInt(this.bedPointfour.toString());
  }

  bedfourchange(){
    this.totalbedPoint = parseInt(this.bedPointone.toString()) + parseInt(this.bedPointtwo.toString()) 
    + parseInt(this.bedPointthree.toString()) + parseInt(this.bedPointfour.toString());
  }

  abwonechange(){
    this.totalabw = (parseFloat(this.abwPointone) + parseFloat(this.abwPointtwo) + parseFloat(this.abwPointthree) +parseFloat(this.abwPointfour)).toFixed(2).toString();
    this.totalabwpoint = (parseFloat(this.totalabw) - this.totalbedPoint);
  }

  abwtwochange(){
    this.totalabw = (parseFloat(this.abwPointone) + parseFloat(this.abwPointtwo) + parseFloat(this.abwPointthree) +parseFloat(this.abwPointfour)).toFixed(2).toString();
    this.totalabwpoint = (parseFloat(this.totalabw) - this.totalbedPoint);
  }

  abwthreechange(){
    this.totalabw = (parseFloat(this.abwPointone) + parseFloat(this.abwPointtwo) + parseFloat(this.abwPointthree) +parseFloat(this.abwPointfour)).toFixed(2).toString();
    this.totalabwpoint = (parseFloat(this.totalabw) - this.totalbedPoint);
  }

  abwfourchange(){
    this.totalabw = (parseFloat(this.abwPointone) + parseFloat(this.abwPointtwo) + parseFloat(this.abwPointthree) +parseFloat(this.abwPointfour)).toFixed(2).toString();
    this.totalabwpoint = (parseFloat(this.totalabw) - this.totalbedPoint);
  }


}
