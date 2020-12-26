import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  IDEALCAL: number = 0;
  IDEALPROTEIN: number = 0;
  TARGETCAL: number = 0;
  TARGETPROTEIN: number = 0;
  FEEDVOL: number = 0;
  CALORIEDENSITY : number = 0;
  FEEDRATE : number = 0;
  DISPARITY: number = 0;
  CHO: number = 0;
  FAT : number = 0;
  PRESCRIBEDPROTEIN: number = 0;
  PRESCRIBEDCALORIE: number = 0;
  RECEIVINGCALORIE: number = 0;
  RECEIVINGPROTEIN: number = 0;
  MRNO: number;
  ICUDAY: number;
  responseData : any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";


  constructor(private dialogRef : MatDialogRef<PrescriptionComponent>, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {

    console.log(data);
    this.IDEALCAL = data.IDEALCAL;
    this.IDEALPROTEIN = data.IDEALPROTEIN;
    this.TARGETCAL = data.TARGETCAL;
    this.TARGETPROTEIN = data.TARGETPROTEIN;
    this.MRNO = data.MRNO;
    this.ICUDAY = data.ICUDAY;


   }

  ngOnInit() {
  }

  submitData(){

    this.http.get(this.rootURL+ '/UPDATEPRESCRIPTION', 
      {params : { MRNO: this.MRNO.toString(),  ICUDAY : this.ICUDAY.toString(), IDEAL_CALORIE: this.IDEALCAL.toString(), 
        TARGET_CALORIE: this.TARGETCAL.toString(), PRESCRIBED_CALORIE: this.PRESCRIBEDCALORIE.toString()
        ,  IDEAL_PROTEIN : this.IDEALPROTEIN.toString(),
        TARGET_PROTEIN: this.TARGETPROTEIN.toString(), PRESCRIBED_PROTEIN : this.PRESCRIBEDPROTEIN.toString(),
        FEEDRATE: this.FEEDRATE.toString(), FEEDVOL : this.FEEDVOL.toString(),
        CALORICDENSITY : this.CALORIEDENSITY.toString(), FAT: this.FAT.toString(), CHO: this.CHO.toString() } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        //this.IBW = this.responseData[0].IBW;
        //this.BMI = this.responseData[0].BMI;
        this.dialogRef.close(
          {
            IDEALCAL:this.IDEALCAL,
            TARGETCAL: this.TARGETCAL,
            PRESCRIBEDCAL: this.PRESCRIBEDCALORIE,
            RECEIVINGCAL: this.RECEIVINGCALORIE,
            IDEALPROTEIN: this.IDEALPROTEIN,
            TARGETPROTEIN: this.TARGETPROTEIN,
            PRESCRIBEDPROTEIN: this.PRESCRIBEDPROTEIN,
            RECEIVINGPROTEIN: this.RECEIVINGPROTEIN,
            FEEDRATE: this.FEEDRATE,
            FEEDVOL: this.FEEDVOL,
            CALORICDENSITY: this.CALORIEDENSITY
          });
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 
  }

  


  onNoClick(){
    this.dialogRef.close({IDEALCAL:this.IDEALCAL, TARGETCAL: this.TARGETCAL, PRESCRIBEDCAL: this.PRESCRIBEDCALORIE,
      IDEALPROTEIN: this.IDEALPROTEIN, TARGETPROTEIN: this.TARGETPROTEIN, PRESCRIBEDPROTEIN: this.PRESCRIBEDPROTEIN,
      FEEDRATE: this.FEEDRATE, FEEDVOL: this.FEEDVOL, CALORICDENSITY: this.CALORIEDENSITY, FAT: this.FAT, CHO: this.CHO
    });
  }

}
