import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-appacheentrymode',
  templateUrl: './appacheentrymode.component.html',
  styleUrls: ['./appacheentrymode.component.css']
})
export class AppacheentrymodeComponent implements OnInit {

  MRNO: number = 0;
  BEDNO: number = 0;
  LOCATION: string = '';
  datalabel: string = '';
  datavalue: number = 0;
  TemperatureValue : string = '0';
  TemperaturePoint : number = 0;
  TemperaturePer: string = '0.0%';
  MeanArterialRateValue: string = '0';
  MeanArterialRatePoint: number = 0;
  MeanArterialRatePer: string = '0.0%';
  HeartRateValue: string = '0';
  HeartRatePoint: number = 0;
  HeartRatePer : string = '0.0%';
  RespiratoryRateValue: string = '0';
  RespiratoryRatePoint: number = 0;
  RespiratoryRatePer: string = '0.0%';
  ArterialRateValue: string = '0';
  ArterialRatePoint: number = 0;
  ArterialRatePer: string = '0.0%';
  WBCValue : string = '0';
  WBCPoint: number = 0;
  WBCPer: string = '0.0%';
  SeriumSodiumValue : string = '0';
  SeriumSodiumPoint: number = 0;
  SeriumSodiumPer: string = '0.0%';
  PotassiumValue : string = '0';
  PotassiumPoint: number = 0;
  PotassiumPer: string = '0.0%';
  responseData: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";


  constructor(private dialogRef : MatDialogRef<AppacheentrymodeComponent>, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient,
  private toast: ToastrModule, public service: DataServiceService) {
    this.MRNO = data.MRNO;
      this.BEDNO = data.BEDNO;
      this.LOCATION = data.LOCATION;
   }

  ngOnInit() {
    this.resetForm();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  resetForm(form?: NgForm){
    if(form != null)
      form.resetForm();
    this.service.formAppache = {
      BEDNO : '',
      MRNO : 0,
      ARTERIAL_RATE : '',
      SERUM_CREATININE : '',
      HEMATOCRIT : '',
      MEAN_ARTERIAL_PRESSURE : '',
      SERUM_POTASSIUM : '',
      RESPIRATORY_RATE : '',
      TEMPERATURE : '',
      ACTION : 0,
      WBC : null,
      SERUM_SODIUM : '',
      HEARTRATE : '',
      LOCATION: '',
      VISIT_ID : '',
      READBY: ''
    }
  }

  submitdata(){ 
 
    this.http.get(this.rootURL+ '/GetAppacheMasterEntry', 
    {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString()
      , ARTERIALRATE: this.ArterialRateValue.toString(), AR_SCORE: this.ArterialRatePoint.toString(),
       HEARTRATE: this.HeartRateValue.toString(), HR_SCORE: this.HeartRatePoint.toString(),TEMPERATURE: this.TemperatureValue.toString(),
       TEMP_SCORE: this.TemperaturePoint.toString(),MAP : this.MeanArterialRateValue.toString(), MAP_SCORE: this.MeanArterialRatePoint.toString(),
       POTASSIUM: this.PotassiumValue.toString(), POTASSIUM_SCORE: this.PotassiumPoint.toString(),  
       RESPRATE: this.RespiratoryRateValue.toString(),RESP_SCORE : this.RespiratoryRatePoint.toString(),
       SODIUM: this.SeriumSodiumValue.toString(),SODIUM_SCORE: this.SeriumSodiumPoint.toString(), LOCATION: this.LOCATION.toString()
       ,READBY : '299'  } } 
    ).subscribe(res => {
      this.responseData = JSON.parse(JSON.stringify(res));
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
