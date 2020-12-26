import { AlertcomponentComponent } from './../alertcomponent/alertcomponent.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrModule } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { parse } from 'date-fns';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit {

  data: any;
  MRNOPassed: number = 0;
  responseData: any;
  MRNOSelect : number = 0;
  isPickedText: boolean = true;
  isPickedSelect : boolean = false;
  isEditSave : boolean = false;
  items: any;
  BedNo : string = '';
  MRNO : string = '';
  FirstName : string = '';
  Entrydate : string = '';
  Age: string = '';
  Gender: string = '';
  DOAH: string = '';
  DOAICU : string = '';
  Diagnosis : string = '';
  Location: string = '';
  ICUDAY : string = '';
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";
  apiUrl: string = 'http://hospital.dexteradomini.in/api/DataApi/GetMRNNo';
  apiUrlData: string = 'http://hospital.dexteradomini.in/api/DataApi/GetMRNNoData';

  constructor(private dialog: MatDialog,private dialogRef : MatDialogRef<DemographicsComponent>, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient, private datePipe: DatePipe, private http2: HttpClient,
    private datepipe: DatePipe
    , @Inject(MAT_DIALOG_DATA) data) { 
      if(data.MRNOPassed > 0){
        this.MRNOPassed = data.MRNOPassed;
      }
    }

  ngOnInit() {
    this.resetForm();
    this.http2.get(this.apiUrl).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        this.items = JSON.parse(itemstest);
        console.log(this.items);

        
      },
      err => {
        
        console.log(err);
      }
    ); 
  }

  onEditClick(){
    if(this.MRNOPassed == 0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.data = {
        alerttext: 'Kindly Select MRNO'
      };
      dialogConfig.panelClass = 'my-dialog';
      this.dialog.open(AlertcomponentComponent, dialogConfig);
    }else{
      this.http.get(this.apiUrlData, {params : { MRNO : this.MRNOPassed.toString()} }).subscribe(
        res => {
          var itemstest = JSON.stringify(res);
          this.data = JSON.parse(itemstest);
    
          //this.Entrydate = formatDate(this.data.ENTRY_DATE, 'yyyy-MM-dd', 'en-US');
          //this.doah = formatDate(this.data.DOAH, 'yyyy-MM-dd', 'en-US');
          //this.doaicu = formatDate(this.data.DOAICU, 'yyyy-MM-dd', 'en-US'); 
          this.BedNo = this.data.BED_NO;
          this.MRNO = this.data.MRNO;
          this.FirstName = this.data.FIRSTNAME;
          this.Age = this.data.AGE;
          this.Gender = this.data.GENDER;
          this.DOAH =  formatDate(this.data.DOAH, 'yyyy-MM-dd', 'en-US');
          this.DOAICU = formatDate(this.data.DOAICU, 'yyyy-MM-dd', 'en-US');
          this.Diagnosis = this.data.DIAGNOSIS;
          this.Location = this.data.LOCATION;
          this.Entrydate = formatDate(this.data.ENTRY_DATE, 'yyyy-MM-dd', 'en-US');
          this.ICUDAY = this.data.ICUDAY;
          //this.showSpinner = false;
    
          this.service.formDataDemographics.MRNO = Number(this.MRNO);
          this.service.formDataDemographics.BedNo = Number(this.BedNo);
          this.service.formDataDemographics.Firstname = this.FirstName;
          this.service.formDataDemographics.Gender = this.Gender;
          this.service.formDataDemographics.diagnosis = this.Diagnosis;
          this.service.formDataDemographics.doah = parse(this.DOAH, 'M/d/yyyy', new Date());
          this.service.formDataDemographics.doaicu = parse(this.DOAICU, 'M/d/yyyy', new Date());
          this.service.formDataDemographics.entrydate = parse(this.Entrydate, 'M/d/yyyy', new Date());
          this.service.formDataDemographics.icuday = Number(this.ICUDAY);
          this.service.formDataDemographics.location = this.Location;
          this.isEditSave = true;
        },
        err => {
          console.log(err);
        }
      ); 
      
      

    }
  }

  onChange(e){
    
   this.MRNOSelect = e.target.value;

   this.http.get(this.apiUrlData, {params : { MRNO : this.MRNOSelect.toString()} }).subscribe(
    res => {
      var itemstest = JSON.stringify(res);
      this.data = JSON.parse(itemstest);

      /* this.entrydate = formatDate(this.data.ENTRY_DATE, 'yyyy-MM-dd', 'en-US');
      this.doah = formatDate(this.data.DOAH, 'yyyy-MM-dd', 'en-US');
      this.doaicu = formatDate(this.data.DOAICU, 'yyyy-MM-dd', 'en-US'); */
      this.BedNo = this.data.BED_NO;
      this.MRNO = this.data.MRNO;
      this.FirstName = this.data.FIRSTNAME;
      this.Age = this.data.AGE;
      this.Gender = this.data.GENDER;
      //this.DOAH =  formatDate(this.data.DOAH, 'yyyy-MM-dd', 'en-US');
      //this.DOAICU = formatDate(this.data.DOAICU, 'yyyy-MM-dd', 'en-US');
      this.Diagnosis = this.data.DIAGNOSIS;
      this.Location = this.data.LOCATION;
      //.Entrydate = formatDate(this.data.ENTRY_DATE, 'yyyy-MM-dd', 'en-US');
      this.ICUDAY = this.data.ICUDAY;
      //this.showSpinner = false;

      this.service.formDataDemographics.MRNO = Number(this.MRNO);
      this.service.formDataDemographics.Firstname = this.FirstName;
      this.service.formDataDemographics.Age = this.Age;
      this.service.formDataDemographics.Gender = this.Gender;
      this.service.formDataDemographics.icuday = 1;
      this.service.formDataDemographics.entrydate = new Date();
    },
    err => {
      console.log(err);
    }
  ); 
  }
  

  onNoClick(){
    this.dialogRef.close();
  }

  resetForm(form?: NgForm){
    if(form != null)
      form.resetForm();
    this.service.formDataDemographics = {
      BedNo : 0,
      MRNO : 0,
      Firstname : '',
      Age : '',
      Gender : '',
      doah : null,
      doaicu : null,
      diagnosis : '',
      location : '',
      icuday : 0,
      entrydate : null,
      enteredby : '',
      patstatus : '',
      visitid : ''
    }
  }

  onSubmit(form: NgForm){
    if(!this.isEditSave){
      this.insertRecord(form);
    }else{
      this.updateRecord(form);
      this.isEditSave = false;
    }
    
  }

  insertRecord(formdata: NgForm){
    console.log(formdata.value);
     this.http.get(this.rootURL+ '/CreateDemographics', 
      {params : { BedNo : formdata.value.BedNo, MRNO: formdata.value.MRNO, Firstname: formdata.value.Firstname
        , Age: formdata.value.Age,
        Gender: formdata.value.Gender, doah: this.datePipe.transform(formdata.value.doah, 'dd-MMM-yyyy'), 
        doaicu: this.datePipe.transform(formdata.value.doaicu, 'dd-MMM-yyyy')
                  , diagnosis : formdata.value.diagnosis,
                  location: formdata.value.location,entrydate: this.datePipe.transform(formdata.value.entrydate, 'dd-MMM-yyyy') , icuday: formdata.value.icuday
                  , enteredby: '9812',patstatus: '1',visitid: '1'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.stringify(res);
        this.dialogRef.close();
        this.resetForm(formdata);
        alert("Demographics added successfully");
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 
    
  }

  updateRecord(formdata: NgForm){
    console.log(formdata.value);
     this.http.get(this.rootURL+ '/DemographicsUpdate', 
      {params : { BedNo : formdata.value.BedNo, MRNO: formdata.value.MRNO, Firstname: formdata.value.Firstname
        , Age: formdata.value.Age,
        Gender: formdata.value.Gender, doah: this.datePipe.transform(formdata.value.doah, 'dd-MMM-yyyy'), 
        doaicu: this.datePipe.transform(formdata.value.doaicu, 'dd-MMM-yyyy')
                  , diagnosis : formdata.value.diagnosis,
                  location: formdata.value.location,entrydate: this.datePipe.transform(formdata.value.entrydate, 'dd-MMM-yyyy') , icuday: formdata.value.icuday
                  , enteredby: '9812',patstatus: '1',visitid: '1', OLDMRNO: this.MRNOPassed.toString()
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.stringify(res);
        this.dialogRef.close();
        this.resetForm(formdata);
        alert("Demographics updated successfully");
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 
    
  }

  pickMRNO(e){
    let value = e.target.value;
    if(value == "text"){
      this.isPickedText = true;
      this.isPickedSelect = false;
    }else{
      this.isPickedText = false;
      this.isPickedSelect = true;
    }
  }

}
