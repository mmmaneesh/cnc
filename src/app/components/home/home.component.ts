import { ReferenceComponent } from './../reference/reference.component';
import { AppacheanalysisComponent } from './../appacheanalysis/appacheanalysis.component';
import { CreatechecklistComponent } from './../createchecklist/createchecklist.component';
import { ChecklistComponent } from './../checklist/checklist.component';
import { Component, OnInit, Directive, Input, ViewChild, ElementRef } from '@angular/core';
import { NutricscoreComponent } from './../nutricscore/nutricscore.component';
import { SofascoreComponent } from './../sofascore/sofascore.component';
import { AnthropometryComponent } from './../anthropometry/anthropometry.component';
import { DemographicsComponent } from './../demographics/demographics.component';
import { PrescriptionComponent } from './../prescription/prescription.component';
import { AppachescoreComponent } from './../appachescore/appachescore.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonModule, formatDate } from '@angular/common'; 
import {trigger, state, style, transition, animate } from "@angular/animations";
import { GaugeChartModule } from 'angular-gauge-chart';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
declare var jquery:any;
declare var $ :any;


import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { SofaanalysisComponent } from '../sofaanalysis/sofaanalysis.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { GoogleChartComponent } from "angular-google-charts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(5000)
      ]),
      transition('* => void', [
        animate(5000, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})




export class HomeComponent implements OnInit {

  

  @ViewChild("chart", {static: false}) chart: ChartComponent;



  @ViewChild('spana1', {static: false}) spana1 : ElementRef;
  @ViewChild('spana2', {static: false}) spana2 : ElementRef;
  @ViewChild('spana3', {static: false}) spana3 : ElementRef;
  @ViewChild('spana4', {static: false}) spana4 : ElementRef;
  @ViewChild('spana5', {static: false}) spana5 : ElementRef;
  @ViewChild('spana6', {static: false}) spana6 : ElementRef;
  @ViewChild('spana7', {static: false}) spana7 : ElementRef;
  @ViewChild('spana8', {static: false}) spana8 : ElementRef;
  @ViewChild('spana9', {static: false}) spana9 : ElementRef;
  @ViewChild('spana10', {static: false}) spana10 : ElementRef;
  @ViewChild('spana11', {static: false}) spana11 : ElementRef;
  @ViewChild('spana12', {static: false}) spana12 : ElementRef;
  @ViewChild('spana13', {static: false}) spana13 : ElementRef;


  @ViewChild('spanb1', {static: false}) spanb1 : ElementRef;
  @ViewChild('spanb2', {static: false}) spanb2 : ElementRef;
  @ViewChild('spanb3', {static: false}) spanb3 : ElementRef;
  @ViewChild('spanb4', {static: false}) spanb4 : ElementRef;
  @ViewChild('spanb5', {static: false}) spanb5 : ElementRef;
  @ViewChild('spanb6', {static: false}) spanb6 : ElementRef;
  @ViewChild('spanb7', {static: false}) spanb7 : ElementRef;
  @ViewChild('spanb8', {static: false}) spanb8 : ElementRef;
  @ViewChild('spanb9', {static: false}) spanb9 : ElementRef;
  @ViewChild('spanb10', {static: false}) spanb10 : ElementRef;
  @ViewChild('spanb11', {static: false}) spanb11 : ElementRef;
  @ViewChild('spanb12', {static: false}) spanb12 : ElementRef;
  @ViewChild('spanb13', {static: false}) spanb13 : ElementRef;


  @ViewChild('spanc1', {static: false}) spanc1 : ElementRef;
  @ViewChild('spanc2', {static: false}) spanc2 : ElementRef;
  @ViewChild('spanc3', {static: false}) spanc3 : ElementRef;
  @ViewChild('spanc4', {static: false}) spanc4 : ElementRef;
  @ViewChild('spanc5', {static: false}) spanc5 : ElementRef;
  @ViewChild('spanc6', {static: false}) spanc6 : ElementRef;
  @ViewChild('spanc7', {static: false}) spanc7 : ElementRef;
  @ViewChild('spanc8', {static: false}) spanc8 : ElementRef;
  @ViewChild('spanc9', {static: false}) spanc9 : ElementRef;
  @ViewChild('spanc10', {static: false}) spanc10 : ElementRef;
  @ViewChild('spanc11', {static: false}) spanc11 : ElementRef;
  @ViewChild('spanc12', {static: false}) spanc12 : ElementRef;
  @ViewChild('spanc13', {static: false}) spanc13 : ElementRef;


  public chartOptions: Partial<ChartOptions>;

  showSpinner = false;

  IBW:number;
  BMI:number;
  IDEALCAL: number = 0;
  IDEALPROTEIN: number = 0;
  TARGETCAL: number = 0;
  TARGETPROTEIN: number = 0;
  DebtProtein: number = 0;
  DebtCal : number = 0;
  PRESCRIBEDCAL : number = 0;
  PRESCRIBEDPROTEIN : number = 0;
  FEEDRATE: number = 0;
  FEEDVOL: number = 0;
  CALORICDENSITY : number = 0;
  AppacheScoredata : number = 0;
  SofaScoredata: number = 0;
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
  currentdata =[ ["Scores", 0]];
  NutricScore: number = 0;


  isNormal:boolean = true;
  isHuman:boolean = false;
  isProtein:boolean = false;
  isCalorie:boolean = false;
  apiUrlUpdateIcuDay: string = 'http://hospital.dexteradomini.in/api/DataApi/UPDATEICUDAY';
  apiUrl: string = 'http://hospital.dexteradomini.in/api/DataApi/GetMRNNo';
  apiUrlData: string = 'http://hospital.dexteradomini.in/api/DataApi/GetMRNNoData';
  apiUrlCalc: string = 'http://hospital.dexteradomini.in/api/DataApi/GetCurrentAppache';
  apiUrlSofa: string = 'http://hospital.dexteradomini.in/api/DataApi/GetCurrentSofa';
  bottomfirst : string = '80%';
  afterfirst : string = '80%';
  bottomsecond : string = '60%';
  aftersecond : string = '60%';
  bottomthird : string = '40%';
  afterthird : string = '40%';
  bottomfourth : string = '100%';
  afterfourth : string = '100%';
  @ViewChild('loaderclass', {static: false}) loaderimg: ElementRef;
  viewHeightone : number = 0;
  viewheightonepx : string = '';
  isAudittrailShown : boolean = false;

  RECEIVINGCAL: number = 0;
  RECEIVINGPROTEIN: number = 0;
  DEBTCAL: number = 0;
  CUMULATIVEDEBT: number = 0;
  SUGGESTEDTARGET: number = 0;
  FAT: number = 0;
  CHO: number = 0;

  DEBTCAL1: number = 0;
  DEBTCAL2: number = 0;
  DEBTCAL3: number = 0;
  DEBTCAL4: number = 0;
  DEBTPROTEIN: number = 0;
  DEBTPROTEIN1: number = 0;
  DEBTPROTEIN2: number = 0;
  DEBTPROTEIN3: number = 0;
  DEBTPROTEIN4: number = 0;

  TARGETCALORIE1: number = 0;
  TARGETCALORIE2: number = 0;
  TARGETCALORIE3: number = 0;
  TARGETCALORIE4: number = 0;
  
  RECEIVINGCALORIE1: number = 0;
  RECEIVINGCALORIE2: number = 0;
  RECEIVINGCALORIE3: number = 0;
  RECEIVINGCALORIE4: number = 0;

  PRESCRIBEDCALORIE1: number = 0;
  PRESCRIBEDCALORIE2: number = 0;
  PRESCRIBEDCALORIE3: number = 0;
  PRESCRIBEDCALORIE4: number = 0;

  CUMULATIVEDEBT1: number = 0;
  CUMULATIVEDEBT2: number = 0;
  CUMULATIVEDEBT3: number = 0;
  CUMULATIVEDEBT4: number = 0;

  SUGGESTEDTARGET1: number = 0;
  SUGGESTEDTARGET2: number = 0;
  SUGGESTEDTARGET3: number = 0;
  SUGGESTEDTARGET4: number = 0;

  IsProteinTarget: boolean = false;
  IsProteinDebt: boolean = false;
  IsProteinCumulative: boolean = false;

  IsCalorieTarget: boolean = false;
  IsCalorieDebt: boolean = false;
  IsCalorieCumulative: boolean = false;

  
  items: any;
  data: any;
  /* entrydate = undefined;
  doah = undefined;
  doaicu = undefined; */

 

  public canvasWidth = 200
  public needleValue = 0
  public centralLabel = ''
  public name = 'Appache Score'
  public bottomLabel = '0'
  public bottomLabelColor = '65'
  public options = {
      hasNeedle: true,
      needleColor: 'yellow',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(51,123,255)','rgb(128,0,0)'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
      
  }

  public canvasWidthsofa = 200
  public needleValuesofa = 0
  public centralLabelsofa = ''
  public namesofa = 'Sofa Score'
  public bottomLabelsofa = '0'
  public bottomLabelColorsofa = '65'
  public optionssofa = {
      hasNeedle: true,
      needleColor: 'yellow',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(51,123,255)','rgb(128,0,0)'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
      
  }

  public canvasWidthnutric = 200
  public needleValuenutric = 0
  public centralLabelnutric = ''
  public namenutric = 'Nutric Score'
  public bottomLabelnutric = '0'
  public bottomLabelColornutric = '65'
  public optionsnutric = {
      hasNeedle: true,
      needleColor: 'yellow',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(51,123,255)','rgb(128,0,0)'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
      
  }
  

  constructor(private dialog: MatDialog, private http: HttpClient, private http2: HttpClient, private http3: HttpClient,
    private httpPres: HttpClient) {
     this.chartOptions = {
      series: [
        {
          name: "Protein",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Calorie",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    }; 

    
   }

   onChange(e){
     this.showSpinner = true;
    let value = e.target.value;
    console.log(value);

    this.http3.get(this.apiUrlUpdateIcuDay, {params : { MRNO : value.toString(), ICUDAY : '0'} }).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        var tempconsole = JSON.parse(itemstest);
        console.log(tempconsole);
      },
      err => {
        console.log(err);
      }
    ); 

    




    this.http.get(this.apiUrlData, {params : { MRNO : value.toString()} }).subscribe(
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
        this.DOAH =  formatDate(this.data.DOAH, 'yyyy-MM-dd', 'en-US');
        this.DOAICU = formatDate(this.data.DOAICU, 'yyyy-MM-dd', 'en-US');
        this.Diagnosis = this.data.DIAGNOSIS;
        this.Location = this.data.LOCATION;
        this.Entrydate = formatDate(this.data.ENTRY_DATE, 'yyyy-MM-dd', 'en-US');
        this.ICUDAY = this.data.ICUDAY;
        this.showSpinner = false;
      },
      err => {
        console.log(err);
      }
    ); 
    


    this.http2.get(this.apiUrlCalc, {params : { MRNO : value.toString()} }).subscribe(res => {
      var itemstest = JSON.stringify(res);
      
      this.AppacheScoredata = JSON.parse(itemstest);
      this.bottomLabel = JSON.parse(itemstest);
      this.needleValue = JSON.parse(itemstest);
      this.AppacheScoredata = 78;
      this.calculateAppacheSpeedometer(this.AppacheScoredata);
   
    },
    err => {
      console.log(err);
    }
    );

    this.http3.get(this.apiUrlSofa, {params : { MRNO : value.toString()} }).subscribe(res => {
      var itemstest = JSON.stringify(res);
      
      this.SofaScoredata = JSON.parse(itemstest);
      this.SofaScoredata = 11;
      this.calculateSofaSpeedometer(this.SofaScoredata);
   
    },
    err => {
      this.showSpinner = false;
      console.log(err);
    }
    );

    
    

    
   }

  

   ngAfterViewInit() {
    //this.viewHeightone = this.loaderimg.nativeElement.offsetHeight;
    //this.viewheightonepx = this.viewHeightone + 'px';
    
   }
  

  ngOnInit() {
    /* jquery('.myValuesspeed').myfunc({
      divFact: 10,
      eventListenerType: 'focus'
  });

  jquery(document).ready(function() {
      jquery(".myValuesspeed").val('65');
      jquery(".myValuesspeed").focus();

  }); */



    this.showSpinner = true;
    this.http.get(this.apiUrl).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        this.items = JSON.parse(itemstest);
        console.log(this.items);

        this.showSpinner = false;
      },
      err => {
        this.showSpinner = false;
        console.log(err);
      }
    ); 

    

  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  onAppacheScore(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      MRNO: this.MRNO,
      BEDNO: this.BedNo,
      LOCATION: this.Location
    };
    let dialogref = this.dialog.open(AppachescoreComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      /* console.log('after closes appachescore');
      console.log(res); */
      this.AppacheScoredata = res.data;
      this.calculateAppacheSpeedometer(this.AppacheScoredata);
      
      
    });
    /* this.dialog.af.subscribe(res =>{
      console.log('after closes appachescore');
      console.log(res);
      this.AppacheScoredata = res.data;
    }); */
  }
  onSofaScore(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      MRNO: this.MRNO,
      BEDNO: this.BedNo,
      LOCATION: this.Location
    };
    let dialogref = this.dialog.open(SofascoreComponent, dialogConfig);
     dialogref.afterClosed().subscribe(res => {
      
      this.http3.get(this.apiUrlSofa, {params : { MRNO : this.MRNO.toString()} }).subscribe(res1 => {
        var itemstest = JSON.stringify(res1);
        
        this.SofaScoredata = JSON.parse(itemstest);
        this.SofaScoredata = 11;
        this.calculateSofaSpeedometer(this.SofaScoredata);
     
      },
      err => {
        console.log(err);
      }
      );
      
    }); 

  }
  onNutricScore(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      Age: this.Age,
      Appachescore: this.AppacheScoredata,
      Sofascore: this.SofaScoredata,
      Icudays : this.ICUDAY
    };
    let dialogref = this.dialog.open(NutricscoreComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      
      this.NutricScore = res.Nutricscore;
      this.calculateNutricSpeedometer(this.NutricScore);
    });
  }

  speedClass(){
    
  }

  PrescriptionClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {
      IDEALCAL: this.IDEALCAL,
      IDEALPROTEIN: this.IDEALPROTEIN,
      TARGETPROTEIN: this.TARGETPROTEIN,
      TARGETCAL: this.TARGETCAL,
      MRNO: this.MRNO,
      ICUDAY: this.ICUDAY
    };
    dialogConfig.panelClass = 'my-dialog';
    
    let dialogref = this.dialog.open(PrescriptionComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      console.log('after closes PRESCRIPTION');
      console.log(res);
      
      this.IDEALCAL = res.IDEALCAL;
      this.TARGETCAL = res.TARGETCAL;
      this.PRESCRIBEDCAL = res.PRESCRIBEDCAL;
      this.IDEALPROTEIN = res.IDEALPROTEIN;
      this.TARGETPROTEIN = res.TARGETPROTEIN;
      this.PRESCRIBEDPROTEIN = res.PRESCRIBEDPROTEIN;
      this.FEEDRATE = res.FEEDRATE;
      this.FEEDVOL = res.FEEDVOL;
      this.CALORICDENSITY = res.CALORICDENSITY;
      this.FAT = res.FAT;
      this.CHO = res.CHO;
    });
  }


  PrescriptionSwitch(e){
    let value = e.target.value;
    if(value == "Prescription"){
      this.isAudittrailShown = false;
    }else{
      this.isAudittrailShown = true;
    }
  }
  DemographicClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      MRNOPassed: this.MRNO
    };
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(DemographicsComponent, dialogConfig);
  }
  AnthropometryClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      MRNO: this.MRNO,
      BEDNO: this.BedNo,
      NAME: this.FirstName,
      AGE: this.Age,
      GENDER: this.Gender
    };
    let dialogref = this.dialog.open(AnthropometryComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      console.log('after closes anthropometry');
      console.log(res);
      
      this.IBW = res.data.IBW;
      this.BMI = res.data.BMI;
      this.TARGETCAL = res.data.TARGET_CAL;
      this.TARGETPROTEIN = res.data.TARGET_PRO;
      this.IDEALCAL = res.data.IDEAL_CAL;
      this.IDEALPROTEIN = res.data.IDEAL_PRO;
    });
    
  }
  ChecklistClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(ChecklistComponent, dialogConfig);
  }

  ReferenceClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(ReferenceComponent, dialogConfig);
  }

  AddChecklistClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(CreatechecklistComponent, dialogConfig);
  }
  AppacheAnalysisClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(AppacheanalysisComponent, dialogConfig);
  }

  SofaAnalysisClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(SofaanalysisComponent, dialogConfig);
  }

  CalculatorClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(CalculatorComponent, dialogConfig);
  }

  ViewProductClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(ViewproductComponent, dialogConfig);
  }

  AddProductClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(AddproductComponent, dialogConfig);
  }


  graphclick(e){
    let value = e.target.value;
    if(value == "normal"){
      this.isNormal = true;
      this.isHuman = false;
      this.isProtein = false;
      this.isCalorie = false;
    }else if(value == "protein"){
      this.isNormal = false;
      this.isProtein = true;
      this.isHuman = true;
      this.isCalorie = false;
    }else{
      this.isNormal = false;
      this.isHuman = true;
      this.isProtein = false;
      this.isCalorie = true;
    }
  }

  normalgraphclick(){
    this.isNormal = true;
      this.isHuman = false;
      this.isProtein = false;
      this.isCalorie = false;
  }

  proteingraphclickTarget(){
    this.isNormal = false;
    this.IsProteinTarget = true;
    this.IsProteinDebt = false;
    this.IsProteinCumulative = false;
    this.IsCalorieTarget = false;
    this.IsCalorieDebt = false;
    this.IsCalorieCumulative = false;
    this.isHuman = true;
    this.isCalorie = false;
  }
  proteingraphclickDebt(){
    this.isNormal = false;
    this.IsProteinTarget = false;
    this.IsProteinDebt = true;
    this.IsProteinCumulative = false;
    this.IsCalorieTarget = false;
    this.IsCalorieDebt = false;
    this.IsCalorieCumulative = false;
    this.isHuman = true;
    this.isCalorie = false;
  }
  proteingraphclickCumulative(){
    this.isNormal = false;
    this.IsProteinTarget = false;
    this.IsProteinDebt = false;
    this.IsProteinCumulative = true;
    this.IsCalorieTarget = false;
    this.IsCalorieDebt = false;
    this.IsCalorieCumulative = false;
    this.isHuman = true;
    this.isCalorie = false;
  }

  caloriegraphclickTarget(){
    this.isNormal = false;
      this.isHuman = true;
      this.isProtein = false;
      this.IsProteinTarget = false;
    this.IsProteinDebt = false;
    this.IsProteinCumulative = false;
    this.IsCalorieTarget = true;
    this.IsCalorieDebt = false;
    this.IsCalorieCumulative = false;
  }
  caloriegraphclickDebt(){
    this.isNormal = false;
      this.isHuman = true;
      this.isProtein = false;
      this.IsProteinTarget = false;
    this.IsProteinDebt = false;
    this.IsProteinCumulative = false;
    this.IsCalorieTarget = false;
    this.IsCalorieDebt = true;
    this.IsCalorieCumulative = false;
  }
  caloriegraphclickCumulative(){
    this.isNormal = false;
      this.isHuman = true;
      this.isProtein = false;
      this.IsProteinTarget = false;
    this.IsProteinDebt = false;
    this.IsProteinCumulative = false;
    this.IsCalorieTarget = false;
    this.IsCalorieDebt = false;
    this.IsCalorieCumulative = true;
  }
  

  calculateAppacheSpeedometer(value: number){
     
    this.funcRemoveAppacheSpeedometerAll();
    if(value == 0){
      value = 30000;
    }
     if(value <= 10){
      
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
     }else if(value <= 20){
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
     }else if(value <= 30){
       
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      
    }else if(value <= 40){
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }else if(value <= 50){
      this.spana9.nativeElement.classList.add('speed-marker-1Class9');
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }else if(value <= 60){
      this.spana8.nativeElement.classList.add('speed-marker-1Class8');
      this.spana9.nativeElement.classList.add('speed-marker-1Class9');
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }else if(value <= 70){
      this.spana7.nativeElement.classList.add('speed-marker-1Class7');
      this.spana8.nativeElement.classList.add('speed-marker-1Class8');
      this.spana9.nativeElement.classList.add('speed-marker-1Class9');
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }else if(value <= 80){
      this.spana6.nativeElement.classList.add('speed-marker-1Class6');
      this.spana7.nativeElement.classList.add('speed-marker-1Class7');
      this.spana8.nativeElement.classList.add('speed-marker-1Class8');
      this.spana9.nativeElement.classList.add('speed-marker-1Class9');
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }else if(value <= 90){
      this.spana5.nativeElement.classList.add('speed-marker-1Class5');
      this.spana6.nativeElement.classList.add('speed-marker-1Class6');
      this.spana7.nativeElement.classList.add('speed-marker-1Class7');
      this.spana8.nativeElement.classList.add('speed-marker-1Class8');
      this.spana9.nativeElement.classList.add('speed-marker-1Class9');
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }else if(value <= 130){
      this.spana1.nativeElement.classList.add('speed-marker-1Class1');
      this.spana2.nativeElement.classList.add('speed-marker-1Class2');
      this.spana3.nativeElement.classList.add('speed-marker-1Class3');
      this.spana4.nativeElement.classList.add('speed-marker-1Class4');
      this.spana5.nativeElement.classList.add('speed-marker-1Class5');
      this.spana6.nativeElement.classList.add('speed-marker-1Class6');
      this.spana7.nativeElement.classList.add('speed-marker-1Class7');
      this.spana8.nativeElement.classList.add('speed-marker-1Class8');
      this.spana9.nativeElement.classList.add('speed-marker-1Class9');
      this.spana10.nativeElement.classList.add('speed-marker-1Class10');
      this.spana11.nativeElement.classList.add('speed-marker-1Class11');
      this.spana12.nativeElement.classList.add('speed-marker-1Class12');
      this.spana13.nativeElement.classList.add('speed-marker-1Class13');
    }

    if(value == 30000){
      value = 0;
    }
    
   }

   funcRemoveAppacheSpeedometerAll(){
    this.spana1.nativeElement.classList.remove('speed-marker-1Class1');
    this.spana2.nativeElement.classList.remove('speed-marker-1Class2');
    this.spana3.nativeElement.classList.remove('speed-marker-1Class3');
    this.spana4.nativeElement.classList.remove('speed-marker-1Class4');
    this.spana5.nativeElement.classList.remove('speed-marker-1Class5');
    this.spana6.nativeElement.classList.remove('speed-marker-1Class6');
    this.spana7.nativeElement.classList.remove('speed-marker-1Class7');
    this.spana8.nativeElement.classList.remove('speed-marker-1Class8');
    this.spana9.nativeElement.classList.remove('speed-marker-1Class9');
    this.spana10.nativeElement.classList.remove('speed-marker-1Class10');
    this.spana11.nativeElement.classList.remove('speed-marker-1Class11');
    this.spana12.nativeElement.classList.remove('speed-marker-1Class12');
    this.spana13.nativeElement.classList.remove('speed-marker-1Class13');
   }

   funcAddAppacheSpeedometerAll(){
    this.spana1.nativeElement.classList.add('speed-marker-1Class1');
    this.spana2.nativeElement.classList.add('speed-marker-1Class2');
    this.spana3.nativeElement.classList.add('speed-marker-1Class3');
    this.spana4.nativeElement.classList.add('speed-marker-1Class4');
    this.spana5.nativeElement.classList.add('speed-marker-1Class5');
    this.spana6.nativeElement.classList.add('speed-marker-1Class6');
    this.spana7.nativeElement.classList.add('speed-marker-1Class7');
    this.spana8.nativeElement.classList.add('speed-marker-1Class8');
    this.spana9.nativeElement.classList.add('speed-marker-1Class9');
    this.spana10.nativeElement.classList.add('speed-marker-1Class10');
    this.spana11.nativeElement.classList.add('speed-marker-1Class11');
    this.spana12.nativeElement.classList.add('speed-marker-1Class12');
    this.spana13.nativeElement.classList.add('speed-marker-1Class13');
   }


   calculateSofaSpeedometer(value: number){
     
    this.funcRemoveSofaSpeedometerAll();
    if(value == 0){
      value = 30000;
    }
     if(value <= 10){
      
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
     }else if(value <= 20){
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
     }else if(value <= 30){
       
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      
    }else if(value <= 40){
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }else if(value <= 50){
      this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }else if(value <= 60){
      this.spanb8.nativeElement.classList.add('speed-marker1-1Class8');
      this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }else if(value <= 70){
      this.spanb7.nativeElement.classList.add('speed-marker1-1Class7');
      this.spanb8.nativeElement.classList.add('speed-marker1-1Class8');
      this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }else if(value <= 80){
      this.spanb6.nativeElement.classList.add('speed-marker1-1Class6');
      this.spanb7.nativeElement.classList.add('speed-marker1-1Class7');
      this.spanb8.nativeElement.classList.add('speed-marker1-1Class8');
      this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }else if(value <= 90){
      this.spanb5.nativeElement.classList.add('speed-marker1-1Class5');
      this.spanb6.nativeElement.classList.add('speed-marker1-1Class6');
      this.spanb7.nativeElement.classList.add('speed-marker1-1Class7');
      this.spanb8.nativeElement.classList.add('speed-marker1-1Class8');
      this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }else if(value <= 130){
      this.spanb1.nativeElement.classList.add('speed-marker1-1Class1');
      this.spanb2.nativeElement.classList.add('speed-marker1-1Class2');
      this.spanb3.nativeElement.classList.add('speed-marker1-1Class3');
      this.spanb4.nativeElement.classList.add('speed-marker1-1Class4');
      this.spanb5.nativeElement.classList.add('speed-marker1-1Class5');
      this.spanb6.nativeElement.classList.add('speed-marker1-1Class6');
      this.spanb7.nativeElement.classList.add('speed-marker1-1Class7');
      this.spanb8.nativeElement.classList.add('speed-marker1-1Class8');
      this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
      this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
      this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
      this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
      this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
    }

    if(value == 30000){
      value = 0;
    }
    
   }

   funcRemoveSofaSpeedometerAll(){
    this.spanb1.nativeElement.classList.remove('speed-marker1-1Class1');
    this.spanb2.nativeElement.classList.remove('speed-marker1-1Class2');
    this.spanb3.nativeElement.classList.remove('speed-marker1-1Class3');
    this.spanb4.nativeElement.classList.remove('speed-marker1-1Class4');
    this.spanb5.nativeElement.classList.remove('speed-marker1-1Class5');
    this.spanb6.nativeElement.classList.remove('speed-marker1-1Class6');
    this.spanb7.nativeElement.classList.remove('speed-marker1-1Class7');
    this.spanb8.nativeElement.classList.remove('speed-marker1-1Class8');
    this.spanb9.nativeElement.classList.remove('speed-marker1-1Class9');
    this.spanb10.nativeElement.classList.remove('speed-marker1-1Class10');
    this.spanb11.nativeElement.classList.remove('speed-marker1-1Class11');
    this.spanb12.nativeElement.classList.remove('speed-marker1-1Class12');
    this.spanb13.nativeElement.classList.remove('speed-marker1-1Class13');
   }

   funcAddSofaSpeedometerAll(){
    this.spanb1.nativeElement.classList.add('speed-marker1-1Class1');
    this.spanb2.nativeElement.classList.add('speed-marker1-1Class2');
    this.spanb3.nativeElement.classList.add('speed-marker1-1Class3');
    this.spanb4.nativeElement.classList.add('speed-marker1-1Class4');
    this.spanb5.nativeElement.classList.add('speed-marker1-1Class5');
    this.spanb6.nativeElement.classList.add('speed-marker1-1Class6');
    this.spanb7.nativeElement.classList.add('speed-marker1-1Class7');
    this.spanb8.nativeElement.classList.add('speed-marker1-1Class8');
    this.spanb9.nativeElement.classList.add('speed-marker1-1Class9');
    this.spanb10.nativeElement.classList.add('speed-marker1-1Class10');
    this.spanb11.nativeElement.classList.add('speed-marker1-1Class11');
    this.spanb12.nativeElement.classList.add('speed-marker1-1Class12');
    this.spanb13.nativeElement.classList.add('speed-marker1-1Class13');
   }


   calculateNutricSpeedometer(value: number){
     
    this.funcRemoveNutricSpeedometerAll();
    if(value == 0){
      value = 30000;
    }
     if(value <= 10){
      
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
     }else if(value <= 20){
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
     }else if(value <= 30){
       
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      
    }else if(value <= 40){
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }else if(value <= 50){
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }else if(value <= 60){
      this.spanc8.nativeElement.classList.add('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }else if(value <= 70){
      this.spanc7.nativeElement.classList.add('speed-marker2-1Class7');
      this.spanc8.nativeElement.classList.add('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }else if(value <= 80){
      this.spanc6.nativeElement.classList.add('speed-marker2-1Class6');
      this.spanc7.nativeElement.classList.add('speed-marker2-1Class7');
      this.spanc8.nativeElement.classList.add('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }else if(value <= 90){
      this.spanc5.nativeElement.classList.add('speed-marker2-1Class5');
      this.spanc6.nativeElement.classList.add('speed-marker2-1Class6');
      this.spanc7.nativeElement.classList.add('speed-marker2-1Class7');
      this.spanc8.nativeElement.classList.add('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }else if(value <= 130){
      this.spanc1.nativeElement.classList.add('speed-marker2-1Class1');
      this.spanc2.nativeElement.classList.add('speed-marker2-1Class2');
      this.spanc3.nativeElement.classList.add('speed-marker2-1Class3');
      this.spanc4.nativeElement.classList.add('speed-marker2-1Class4');
      this.spanc5.nativeElement.classList.add('speed-marker2-1Class5');
      this.spanc6.nativeElement.classList.add('speed-marker2-1Class6');
      this.spanc7.nativeElement.classList.add('speed-marker2-1Class7');
      this.spanc8.nativeElement.classList.add('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
    }

    if(value == 30000){
      value = 0;
    }
    
   }

   funcRemoveNutricSpeedometerAll(){
    this.spanc1.nativeElement.classList.remove('speed-marker2-1Class1');
      this.spanc2.nativeElement.classList.remove('speed-marker2-1Class2');
      this.spanc3.nativeElement.classList.remove('speed-marker2-1Class3');
      this.spanc4.nativeElement.classList.remove('speed-marker2-1Class4');
      this.spanc5.nativeElement.classList.remove('speed-marker2-1Class5');
      this.spanc6.nativeElement.classList.remove('speed-marker2-1Class6');
      this.spanc7.nativeElement.classList.remove('speed-marker2-1Class7');
      this.spanc8.nativeElement.classList.remove('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.remove('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.remove('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.remove('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.remove('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.remove('speed-marker2-1Class13');
   }

   funcAddNutricSpeedometerAll(){
    this.spanc1.nativeElement.classList.add('speed-marker2-1Class1');
      this.spanc2.nativeElement.classList.add('speed-marker2-1Class2');
      this.spanc3.nativeElement.classList.add('speed-marker2-1Class3');
      this.spanc4.nativeElement.classList.add('speed-marker2-1Class4');
      this.spanc5.nativeElement.classList.add('speed-marker2-1Class5');
      this.spanc6.nativeElement.classList.add('speed-marker2-1Class6');
      this.spanc7.nativeElement.classList.add('speed-marker2-1Class7');
      this.spanc8.nativeElement.classList.add('speed-marker2-1Class8');
      this.spanc9.nativeElement.classList.add('speed-marker2-1Class9');
      this.spanc10.nativeElement.classList.add('speed-marker2-1Class10');
      this.spanc11.nativeElement.classList.add('speed-marker2-1Class11');
      this.spanc12.nativeElement.classList.add('speed-marker2-1Class12');
      this.spanc13.nativeElement.classList.add('speed-marker2-1Class13');
   }

  

}
