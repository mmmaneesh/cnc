import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appacheeditmode',
  templateUrl: './appacheeditmode.component.html',
  styleUrls: ['./appacheeditmode.component.css']
})
export class AppacheeditmodeComponent implements OnInit {
  datalabel: string = '';
  datavalue: string = '';
  MRNO: number = 0;
  BEDNO: number = 0;
  LOCATION: string = '';
  responseData: any;
  UpdateNo : number = 0;
  readby : string = '299'
  
  

  score: number = 0;
  Updatevalues: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<AppacheeditmodeComponent>, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {
    this.datalabel = data.datalabel;
    
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
    if(this.datalabel === 'Mean Arterial Rate'){
      

       this.http.get(this.rootURL+ '/GetAppacheMAP', 
      {params : { MRNO : this.MRNO.toString()
        , MAP: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',MAP_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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
    }else if(this.datalabel === 'Temperature'){
      this.http.get(this.rootURL+ '/GetAppacheTemp', 
      {params : { MRNO : this.MRNO.toString()
        , TEMPERATURE: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',TEMP_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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
    }else if(this.datalabel === 'Heart Rate'){
      this.http.get(this.rootURL+ '/GetAppacheHeartRate', 
      {params : { MRNO : this.MRNO.toString()
        , HEARTRATE: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',HR_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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

    }else if(this.datalabel === 'Respiratory Rate'){
      this.http.get(this.rootURL+ '/GetAppacheRespiratoryRate', 
      {params : { MRNO : this.MRNO.toString()
        , RESPRATE: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',RESP_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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
    }else if(this.datalabel === 'Arterial Rate'){
      this.http.get(this.rootURL+ '/GetAppacheAerialRate', 
      {params : { MRNO : this.MRNO.toString()
        , ARTERIALRATE: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',AR_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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
    }else if(this.datalabel === 'Potassium'){
      this.http.get(this.rootURL+ '/GetAppachePotassium', 
      {params : { MRNO : this.MRNO.toString()
        , POTASSIUM: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',POTASSIUM_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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
    }else if(this.datalabel === 'Serium Sodium'){
      this.http.get(this.rootURL+ '/GetAppacheSeriumSodium', 
      {params : { MRNO : this.MRNO.toString()
        , SODIUM: this.datavalue.toString(), READBY: this.readby.toString(), READTIME: '',SODIUM_SCORE : '0', 
                  UPDATENO: this.UpdateNo.toString()} } 
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
