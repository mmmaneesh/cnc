import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-sofascoreeleone',
  templateUrl: './sofascoreeleone.component.html',
  styleUrls: ['./sofascoreeleone.component.css']
})
export class SofascoreeleoneComponent implements OnInit {

  MRNO: number = 0;
  BEDNO: number = 0;
  LOCATION: string = '';
  ResValue : string = '';
  ResPoint : number = 0;
  NervValue: string = '';
  NervPoint: number = 0;
  LiverValue: string = '';
  LiverPoint: number = 0;
  CoagulationValue: string = '';
  CoagulationPoint: number = 0;
  KidneyValue: string = '';
  KidneyPoint: number = 0;
  CardiovascularValue : string = '';
  CardiovascularPoint: number = 0;
  datavalue: any;
  dataventilated : boolean = false;
  isnervousvalue : boolean = true;
  isnervousfields: boolean = false;
  isrespvalue : boolean = true;
  isrespfields: boolean = false;
  pao2: string = '';
  fiao2: string = '';
  eyeresponsevalue: number = 0;
  verbalresponsevalue:number = 0;
  motorresponsevalue:number = 0;

  responseData: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<SofascoreeleoneComponent>, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {

      this.MRNO = data.MRNO;
      this.BEDNO = data.BEDNO;
      this.LOCATION = data.LOCATION;
   }

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  nervousclick(e){
    let value = e.target.value;
    if(value == "value"){
      this.isnervousvalue = true;
      this.isnervousfields = false;
    }else if(value == "field"){
      this.isnervousvalue= false;
      this.isnervousfields = true;
    }
  }

  respclick(e){
    let value = e.target.value;
    if(value == "value"){
      this.isrespvalue = true;
      this.isrespfields = false;
    }else if(value == "field"){
      this.isrespvalue= false;
      this.isrespfields = true;
    }
  }

  eyeresponsechange(e){
    this.eyeresponsevalue = e.target.value;
  }

  verbalresponsechange(e){
    this.verbalresponsevalue = e.target.value;
  }

  motorresponsechange(e){
    this.motorresponsevalue = e.target.value;
  }

  submitdata(){ 
    if(this.ResValue.toString() == '' && this.pao2.toString() != '' && this.fiao2.toString() != ''){
      this.ResValue = (parseInt(this.pao2.toString()) / parseFloat(this.fiao2.toString())).toString();
      
    }

    if(this.NervValue.toString() == '' && this.eyeresponsevalue != 0 && this.verbalresponsevalue != 0 && this.motorresponsevalue != 0){
      this.NervValue = (this.eyeresponsevalue + this.motorresponsevalue + this.verbalresponsevalue).toString();
    }

    if(parseFloat(this.KidneyValue.toString()) < 1.2){
      this.KidneyPoint = 0;
    }else if(parseFloat(this.KidneyValue.toString()) >= 1.2 && parseFloat(this.KidneyValue.toString()) <= 1.9){
      this.KidneyPoint = 1;
    }else if(parseFloat(this.KidneyValue.toString()) >= 2.0 && parseFloat(this.KidneyValue.toString()) <= 3.4){
      this.KidneyPoint = 2;
    }else if(parseFloat(this.KidneyValue.toString()) >= 3.5 && parseFloat(this.KidneyValue.toString()) <= 4.9){
      this.KidneyPoint = 3;
    }else if(parseFloat(this.KidneyValue.toString()) >= 5.0){
      this.KidneyPoint = 4;
    }

    if(parseInt(this.ResValue.toString()) > 400){
      this.ResPoint = 0;
    }else if(parseInt(this.ResValue.toString()) >= 301 && parseInt(this.ResValue.toString()) <= 400){
      this.ResPoint = 1;
    }else if(parseInt(this.ResValue.toString()) >= 201 && parseInt(this.ResValue.toString()) <= 300){
      this.ResPoint = 2;
    }else if(parseInt(this.ResValue.toString()) >= 100 && parseInt(this.ResValue.toString()) <= 200 && this.dataventilated){
      this.ResPoint = 3;
    }else if(parseInt(this.ResValue.toString()) < 100 && this.dataventilated){
      this.ResPoint = 4;
    }

    if(parseInt(this.NervValue.toString()) == 15){
      this.NervPoint = 0;
    }else if(parseInt(this.NervValue.toString()) >= 13 && parseInt(this.NervValue.toString()) <= 14){
      this.NervPoint = 1;
    }else if(parseInt(this.NervValue.toString()) >= 10 && parseInt(this.NervValue.toString()) <= 12){
      this.NervPoint = 2;
    }else if(parseInt(this.NervValue.toString()) >= 6 && parseInt(this.NervValue.toString()) <= 9){
      this.NervPoint = 3;
    }else if(parseInt(this.NervValue.toString()) < 6){
      this.NervPoint = 4;
    }

    if(parseFloat(this.LiverValue.toString()) < 1.2){
      this.LiverPoint = 0;
    }else if(parseFloat(this.LiverValue.toString()) >= 1.2 && parseFloat(this.LiverValue.toString()) <= 1.9){
      this.LiverPoint = 1;
    }else if(parseFloat(this.LiverValue.toString()) >= 2.0 && parseFloat(this.LiverValue.toString()) <= 5.9){
      this.LiverPoint = 2;
    }else if(parseFloat(this.LiverValue.toString()) >= 6.0 && parseFloat(this.LiverValue.toString()) <= 11.9){
      this.LiverPoint = 3;
    }else if(parseFloat(this.LiverValue.toString()) >= 12){
      this.LiverPoint = 4;
    }

    if(parseInt(this.CoagulationValue.toString()) >= 150){
      this.CoagulationPoint = 0;
    }else if(parseInt(this.CoagulationValue.toString()) >= 100 && parseInt(this.CoagulationValue.toString()) <= 149){
      this.CoagulationPoint = 1;
    }else if(parseInt(this.CoagulationValue.toString()) >= 50 && parseInt(this.CoagulationValue.toString()) <= 99){
      this.CoagulationPoint = 2;
    }else if(parseInt(this.CoagulationValue.toString()) >= 20 && parseInt(this.CoagulationValue.toString()) <= 49){
      this.CoagulationPoint = 3;
    }else if(parseInt(this.CoagulationValue.toString()) < 20){

      this.CoagulationPoint = 4;
    }

    this.http.get(this.rootURL+ '/GetSofaMasterEntry', 
    {params : { MRNO : this.MRNO.toString(), BED_NO: this.BEDNO.toString(), VISIT_ID: '1'
      , CREATININE: this.KidneyValue.toString(), KIDNEY_SCORE: this.KidneyPoint.toString(), GLASGOW_COMA_SCALE: this.NervValue.toString(),
      NERVOUS_SCORE: this.NervPoint.toString(), Pao2Fio2: this.ResValue.toString(),ISVENTILATED:this.dataventilated.toString(),  RESP_SCORE: this.ResPoint.toString(),
      BILLIRUBIN: this.LiverValue.toString(),LIVER_SCORE: this.LiverPoint.toString(), PLATELETS: this.CoagulationValue.toString()
                , COAG_SCORE : this.CoagulationPoint.toString(), LOCATION: this.LOCATION.toString(),READBY : '299', ICUDAY: '1', 
                POINT: '0',UPDATENO: '1', STATUS: '1',ACTION : '1'
                } } 
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
