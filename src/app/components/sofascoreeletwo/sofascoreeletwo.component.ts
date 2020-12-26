import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sofascoreeletwo',
  templateUrl: './sofascoreeletwo.component.html',
  styleUrls: ['./sofascoreeletwo.component.css']
})
export class SofascoreeletwoComponent implements OnInit {

  datalabel: string = '';
  datavalue: string = '';
  MRNO: number = 0;
  BEDNO: number = 0;
  LOCATION: string = '';
  responseData: any;
  UpdateNo : number = 0;
  isventilated: boolean = false;
  dataventilated: boolean = false;
  Coagscore: number = 0;
  score: number = 0;
  Updatevalues: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<SofascoreeletwoComponent>, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {

    
    this.datalabel = data.datalabel;
    if(this.datalabel === 'Respiratory System'){
      this.isventilated = true;
    }else{
      this.isventilated = false;
    }
    this.MRNO = data.MRNO;
      this.BEDNO = data.BEDNO;
      this.LOCATION = data.LOCATION;
      this.Updatevalues = data.Updatevalues;
   }

  ngOnInit() {
  }

  onChange(e){
    this.UpdateNo = e.target.value;
  }


  onNoClick(){
    this.dialogRef.close();
  }

  
  submitdata(){
    if(this.datalabel === 'Kidney'){
      if(parseFloat(this.datavalue.toString()) < 1.2){
        this.score = 0;
      }else if(parseFloat(this.datavalue.toString()) >= 1.2 && parseFloat(this.datavalue.toString()) <= 1.9){
        this.score = 1;
      }else if(parseFloat(this.datavalue.toString()) >= 2.0 && parseFloat(this.datavalue.toString()) <= 3.4){
        this.score = 2;
      }else if(parseFloat(this.datavalue.toString()) >= 3.5 && parseFloat(this.datavalue.toString()) <= 4.9){
        this.score = 3;
      }else if(parseFloat(this.datavalue.toString()) >= 5.0){
        this.score = 4;
      }

       this.http.get(this.rootURL+ '/GetSofaKidneyAction', 
      {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString(), VISIT_ID: '1'
        , CREATININE: this.datavalue.toString(), KIDNEY_SCORE: this.score.toString(), LOCATION: this.LOCATION.toString(),READBY : '299', ICUDAY: '1', 
                  UPDATENO: this.UpdateNo.toString(), STATUS: '1',ACTION : '2'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        this.dialogRef.close({datavalue:this.datavalue, score: this.score});
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 

      this.dialogRef.close({datavalue:this.datavalue, score: this.score});
    }else if(this.datalabel === 'Respiratory System'){
      if(parseInt(this.datavalue.toString()) > 400){
        this.score = 0;
      }else if(parseInt(this.datavalue.toString()) >= 301 && parseInt(this.datavalue.toString()) <= 400){
        this.score = 1;
      }else if(parseInt(this.datavalue.toString()) >= 201 && parseInt(this.datavalue.toString()) <= 300){
        this.score = 2;
      }else if(parseInt(this.datavalue.toString()) >= 100 && parseInt(this.datavalue.toString()) <= 200 && this.dataventilated){
        this.score = 3;
      }else if(parseInt(this.datavalue.toString()) < 100 && this.dataventilated){
        this.score = 4;
      }

       this.http.get(this.rootURL+ '/GetSofaRespAction', 
      {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString(), VISIT_ID: '1'
        , Pao2Fio2: this.datavalue.toString(), RESP_SCORE:this.score.toString(), ISVENTILATED: this.dataventilated.toString(), LOCATION: this.LOCATION.toString(),READBY : '299', ICUDAY: '1', 
                  UPDATENO: this.UpdateNo.toString(), STATUS: '1',ACTION : '2'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        this.dialogRef.close({datavalue:this.datavalue, score: this.score});
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 

      this.dialogRef.close({datavalue:this.datavalue, score: this.score});
    }else if(this.datalabel === 'Nervous System'){
      if(parseInt(this.datavalue.toString()) == 15){
        this.score = 0;
      }else if(parseInt(this.datavalue.toString()) >= 13 && parseInt(this.datavalue.toString()) <= 14){
        this.score = 1;
      }else if(parseInt(this.datavalue.toString()) >= 10 && parseInt(this.datavalue.toString()) <= 12){
        this.score = 2;
      }else if(parseInt(this.datavalue.toString()) >= 6 && parseInt(this.datavalue.toString()) <= 9){
        this.score = 3;
      }else if(parseInt(this.datavalue.toString()) < 6){
        this.score = 4;
      }

       this.http.get(this.rootURL+ '/GetSofaNervousAction', 
      {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString(), VISIT_ID: '1'
        , GLASGOW_COMA_SCALE: this.datavalue.toString(), NERVOUS_SCORE: this.score.toString(), LOCATION: this.LOCATION.toString(),READBY : '299', ICUDAY: '1', 
                  UPDATENO: this.UpdateNo.toString(), STATUS: '1',ACTION : '2'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        this.dialogRef.close({datavalue:this.datavalue, score: this.score});
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 

      this.dialogRef.close({datavalue:this.datavalue, score: this.score});
    }else if(this.datalabel === 'Liver'){
      if(parseFloat(this.datavalue.toString()) < 1.2){
        this.score = 0;
      }else if(parseFloat(this.datavalue.toString()) >= 1.2 && parseFloat(this.datavalue.toString()) <= 1.9){
        this.score = 1;
      }else if(parseFloat(this.datavalue.toString()) >= 2.0 && parseFloat(this.datavalue.toString()) <= 5.9){
        this.score = 2;
      }else if(parseFloat(this.datavalue.toString()) >= 6.0 && parseFloat(this.datavalue.toString()) <= 11.9){
        this.score = 3;
      }else if(parseFloat(this.datavalue.toString()) >= 12){
        this.score = 4;
      }

      this.http.get(this.rootURL+ '/GetSofaLiverAction', 
      {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString(), VISIT_ID: '1'
        , BILLIRUBIN: this.datavalue.toString(), LIVER_SCORE: this.score.toString(), LOCATION: this.LOCATION.toString(),READBY : '299', ICUDAY: '1', 
                  UPDATENO: this.UpdateNo.toString(), STATUS: '1',ACTION : '2'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        this.dialogRef.close({datavalue:this.datavalue, score: this.score});
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 

      this.dialogRef.close({datavalue:this.datavalue, score: this.score});
    }else if(this.datalabel === 'Coagulation'){
      if(parseInt(this.datavalue.toString()) >= 150){
        this.score = 0;
      }else if(parseInt(this.datavalue.toString()) >= 100 && parseInt(this.datavalue.toString()) <= 149){
        this.score = 1;
      }else if(parseInt(this.datavalue.toString()) >= 50 && parseInt(this.datavalue.toString()) <= 99){
        this.score = 2;
      }else if(parseInt(this.datavalue.toString()) >= 20 && parseInt(this.datavalue.toString()) <= 49){
        this.score = 3;
      }else if(parseInt(this.datavalue.toString()) < 20){
        this.score = 4;
      }


     this.http.get(this.rootURL+ '/GetSofaCoagAction', 
      {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString(), VISIT_ID: '1'
        , PLATELETS: this.datavalue.toString(), COAG_SCORE: this.score.toString(), LOCATION: this.LOCATION.toString(),READBY : '299', ICUDAY: '1', 
                  UPDATENO: this.UpdateNo.toString(), STATUS: '1',ACTION : '2'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        this.dialogRef.close({datavalue:this.datavalue, score: this.score});
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 

      this.dialogRef.close({datavalue:this.datavalue, score: this.score});
    }
  }

}
