import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrModule } from 'ngx-toastr';
import {MAT_DIALOG_DATA} from "@angular/material";
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-anthropometryabw',
  templateUrl: './anthropometryabw.component.html',
  styleUrls: ['./anthropometryabw.component.css']
})
export class AnthropometryabwComponent implements OnInit {

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
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<AnthropometryabwComponent>, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data) { 
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
      {params : { MRNO: this.MRNO.toString(),  Height : this.Height.toString(), Gender: this.Gender.toString()  } } 
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

}
