import { NumberValueAccessor, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule, MatNativeDateModule, MatDatepickerInputEvent } from "@angular/material";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SofascoreeleoneComponent } from '../sofascoreeleone/sofascoreeleone.component';
import { SofascoreeletwoComponent } from '../sofascoreeletwo/sofascoreeletwo.component';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { map, tap, takeUntil, takeWhile} from 'rxjs/operators';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { Observable } from 'rxjs';

export type chartOptionsKidney = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsCoagulation = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsResp = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsLiver = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsNervous = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};



@Component({
  selector: 'app-sofascore',
  templateUrl: './sofascore.component.html',
  styleUrls: ['./sofascore.component.css']
})
export class SofascoreComponent implements OnInit {

  MRNO: number = 0;
  BEDNO: number = 0;
  LOCATION: string = '';
  datalabel: string = '';
  datavalue: number = 0;
  ResValue : string = '0';
  ResPoint : number = 0;
  ResPer: string = '0.0%';
  NervValue: string = '0';
  NervPoint: number = 0;
  NervPer: string = '0.0%';
  LiverValue: string = '0';
  LiverPoint: number = 0;
  LiverPer : string = '0.0%';
  CoagulationValue: string = '0';
  CoagulationPoint: number = 0;
  CoagulationPer: string = '0.0%';
  KidneyValue: string = '0';
  KidneyPoint: number = 0;
  KidneyPer: string = '0.0%';
  CardiovascularValue : string = '0';
  CardiovascularPoint: number = 0;
  CardiovascularPer: string = '0.0%';
  dataventilated: boolean = false;
  entrydate: any;
  responseData: any;
  items:any;
  SofaScoredata: number = 0;
  kidneySofaMain: any;
  nervousSofaMain: any;
  liverSofaMain: any;
  respSofaMain: any;
  coagulationSofaMain: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";
  todaydate: Date;
  

  //adata: ['Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana']; 
  dailyhourKidney:any;
  hourlykidney:any;
  hourlykidneyscore:any;
  hourlykidneylabel:any;
  deltakidney:any;
  deltakidneyscore:any;
  deltakidneylabel:any;
  datelist: string[] = [];
  isSplitdateShownKidney: boolean = false;
  isdailykidneyshown: boolean = true;
  ishourlykidneyshown: boolean = false;
  isdeltakidneyshown: boolean = false;
  detailedKidney: any;
  kidneybuttonvalue: string = 'Daily';


  dailyhourResp:any;
  hourlyResp:any;
  hourlyRespscore:any;
  hourlyResplabel:any;
  deltaResp:any;
  deltaRespscore:any;
  deltaResplabel:any;
  datelistResp: string[] = [];
  isSplitdateShownResp: boolean = false;
  isdailyRespshown: boolean = true;
  ishourlyRespshown: boolean = false;
  isdeltaRespshown: boolean = false;
  detailedResp: any;
  Respbuttonvalue: string = 'Daily';

  dailyhourNervous:any;
  hourlyNervous:any;
  hourlyNervousscore:any;
  hourlyNervouslabel:any;
  deltaNervous:any;
  deltaNervousscore:any;
  deltaNervouslabel:any;
  datelistNervous: string[] = [];
  isSplitdateShownNervous: boolean = false;
  isdailyNervousshown: boolean = true;
  ishourlyNervousshown: boolean = false;
  isdeltaNervousshown: boolean = false;
  detailedNervous: any;
  Nervousbuttonvalue: string = 'Daily';

  dailyhourLiver:any;
  hourlyLiver:any;
  hourlyLiverscore:any;
  hourlyLiverlabel:any;
  deltaLiver:any;
  deltaLiverscore:any;
  deltaLiverlabel:any;
  datelistLiver: string[] = [];
  isSplitdateShownLiver: boolean = false;
  isdailyLivershown: boolean = true;
  ishourlyLivershown: boolean = false;
  isdeltaLivershown: boolean = false;
  detailedLiver: any;
  Liverbuttonvalue: string = 'Daily';


  dailyhourCoagulation:any;
  hourlyCoagulation:any;
  hourlyCoagulationscore:any;
  hourlyCoagulationlabel:any;
  deltaCoagulation:any;
  deltaCoagulationscore:any;
  deltaCoagulationlabel:any;
  datelistCoagulation: string[] = [];
  isSplitdateShownCoagulation: boolean = false;
  isdailyCoagulationshown: boolean = true;
  ishourlyCoagulationshown: boolean = false;
  isdeltaCoagulationshown: boolean = false;
  detailedCoagulation: any;
  Coagulationbuttonvalue: string = 'Daily';
  

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptionsKidney: Partial<chartOptionsKidney>;
  public chartOptionsLiver: Partial<chartOptionsLiver>;
  public chartOptionsNervous: Partial<chartOptionsNervous>;
  public chartOptionsResp: Partial<chartOptionsResp>;
  public chartOptionsCoagulation: Partial<chartOptionsCoagulation>;

  isGraph:boolean = false;
  isGrid:boolean = false;
  isarterial:boolean = false;
  isdropdownclickone = false;
  isgridone:boolean = false;
  isgraphone:boolean = false;
  isdropdownclicktwo = false;
  isgridtwo:boolean = false;
  isgraphtwo:boolean = false;
  isdropdownclickthree = false;
  isgridthree:boolean = false;
  isgraphthree:boolean = false;
  isdropdownclickfour = false;
  isgridfour:boolean = false;
  isgraphfour:boolean = false;
  isdropdownclickfive = false;
  isgridfive:boolean = false;
  isgraphfive:boolean = false;
  isdropdownclicksix = false;
  isgridsix:boolean = false;
  isgraphsix:boolean = false;
  isdropdownclickseven = false;
  isgridseven:boolean = false;
  isgraphseven:boolean = false;
  

  isDailyhourResp: boolean = true;

  @Output() 
dateChange:EventEmitter< MatDatepickerInputEvent< any>>;

  constructor(private dialogRef : MatDialogRef<SofascoreComponent>, private dialog: MatDialog, private http: HttpClient
    , @Inject(MAT_DIALOG_DATA) data, private datePipe: DatePipe, private h1 : HttpClient, private h2: HttpClient,
    private h3: HttpClient, private h4 : HttpClient, private h5: HttpClient) {
      this.MRNO = data.MRNO;
      this.BEDNO = data.BEDNO;
      this.LOCATION = data.LOCATION;
      if(this.MRNO > 0){
        this.todaydate = new Date();
      }
      this.chartOptionsKidney = {
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      };

      this.chartOptionsLiver = {
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      };

      this.chartOptionsNervous = {
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      };

      this.chartOptionsResp = {
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      };

      this.chartOptionsCoagulation = {
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      };

      
      
      
     }
     

  ngOnInit() {
    if(this.MRNO == 0){
      let formattedDate = this.datePipe.transform(this.todaydate, 'dd-MM-yyyy');

      let boolKidney :boolean = false;
      let boolLiver: boolean = false;
      let boolResp: boolean = false;
      let boolNerv : boolean = false;
      let boolCoag: boolean = false;
      let noRecordFound : boolean = true;

      this.h1.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: formattedDate, Action: '1'
          , sofaname : 'KIDNEY'
                    } } 
        ).subscribe(res => {
          this.kidneySofaMain = JSON.parse(JSON.stringify(res));
          this.KidneyValue = this.kidneySofaMain[0].CREATININE;
          this.calculatePointsKidney();
          boolKidney = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h2.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: formattedDate, Action: '1'
          , sofaname : 'COAGULATION'
                    } } 
        ).subscribe(res => {
          this.coagulationSofaMain = JSON.parse(JSON.stringify(res));
          this.CoagulationValue = this.coagulationSofaMain[0].PLATELETS;
          this.calculatePointsCoagulation();
          boolCoag = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h3.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: formattedDate, Action: '1'
          , sofaname : 'LIVER'
                    } } 
        ).subscribe(res => {
          this.liverSofaMain = JSON.parse(JSON.stringify(res));
          this.LiverValue = this.liverSofaMain[0].BILLIRUBIN;
          this.calculatePointsLiver();
          boolLiver = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h4.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: formattedDate, Action: '1'
          , sofaname : 'NERVOUS'
                    } } 
        ).subscribe(res => {
          this.nervousSofaMain = JSON.parse(JSON.stringify(res));
          this.NervValue = this.nervousSofaMain[0].GLASGOW_COMA_SCALE;
          this.calculatePointsNerv();
          boolNerv = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: formattedDate, Action: '1'
          , sofaname : 'RESP'
                    } } 
        ).subscribe(res => {
          this.respSofaMain = JSON.parse(JSON.stringify(res));
          this.ResValue = this.respSofaMain[0].PaO2Fio2;
          this.calculatePointsResp();
          boolResp = true;
        
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        interval(7000)//.pipe(takeWhile(() => !boolKidney || !boolLiver || !boolNerv || !boolResp || !boolCoag))
        .subscribe(i => { 
          // This will be called every 10 seconds until `stopCondition` flag is set to true
          this.calculatePoints();
      });



    }
  }
  

  onNoClick(){
    this.dialogRef.close();
  }

  gridClick(e){
    let value = e.target.value;
    this.isSplitdateShownResp = false;
    if(value == "grid"){
      this.isgridone = true;
      this.isgraphone = false;
      this.isdropdownclickone = true;
    }else if(value == "graph"){
      this.isgridone = false;
      this.isgraphone = true;
      this.isdropdownclickone = true;

      if(this.Respbuttonvalue == 'Daily'){
        this.chartOptionsResp = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourResp
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistResp
          }
        };
      }else if(this.Respbuttonvalue == 'Hourly'){
        this.chartOptionsResp = {
          series: [
            {
              name: "My-series",
              data: this.hourlyRespscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyResplabel
          }
        };
      }else if(this.Respbuttonvalue == 'Delta'){
        this.chartOptionsResp = {
          series: [
            {
              name: "My-series",
              data: this.deltaRespscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaResplabel
          }
        };
      }
    }
  }
  gridClick2(e){
    let value = e.target.value;
    this.isSplitdateShownNervous = false;
    if(value == "grid"){
      this.isgridtwo = true;
      this.isgraphtwo = false;
      this.isdropdownclicktwo = true;
    }else if(value == "graph"){
      this.isgridtwo = false;
      this.isgraphtwo = true;
      this.isdropdownclicktwo = true;

      if(this.Nervousbuttonvalue == 'Daily'){
        this.chartOptionsNervous = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourNervous
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistNervous
          }
        };
      }else if(this.Nervousbuttonvalue == 'Hourly'){
        this.chartOptionsNervous = {
          series: [
            {
              name: "My-series",
              data: this.hourlyNervousscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyNervouslabel
          }
        };
      }else if(this.Nervousbuttonvalue == 'Delta'){
        this.chartOptionsNervous = {
          series: [
            {
              name: "My-series",
              data: this.deltaNervousscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaNervouslabel
          }
        };
      }
    }
  }
  gridClick3(e){
    let value = e.target.value;
    this.isSplitdateShownLiver = false;
    if(value == "grid"){
      this.isgridthree = true;
      this.isgraphthree = false;
      this.isdropdownclickthree = true;
    }else if(value == "graph"){
      this.isgridthree = false;
      this.isgraphthree = true;
      this.isdropdownclickthree = true;

      if(this.Liverbuttonvalue == 'Daily'){
        this.chartOptionsLiver = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourLiver
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistLiver
          }
        };
      }else if(this.Liverbuttonvalue == 'Hourly'){
        this.chartOptionsLiver = {
          series: [
            {
              name: "My-series",
              data: this.hourlyLiverscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyLiverlabel
          }
        };
      }else if(this.Liverbuttonvalue == 'Delta'){
        this.chartOptionsLiver = {
          series: [
            {
              name: "My-series",
              data: this.deltaLiverscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaLiverlabel
          }
        };
      }
    }
  }

  gridClick4(e){
    let value = e.target.value;
    this.isSplitdateShownCoagulation = false;
    if(value == "grid"){
      this.isgridfour = true;
      this.isgraphfour = false;
      this.isdropdownclickfour = true;
    }else if(value == "graph"){
      this.isgridfour = false;
      this.isgraphfour = true;
      this.isdropdownclickfour = true;

      if(this.Coagulationbuttonvalue == 'Daily'){
        this.chartOptionsCoagulation = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourCoagulation
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistCoagulation
          }
        };
      }else if(this.Coagulationbuttonvalue == 'Hourly'){
        this.chartOptionsCoagulation = {
          series: [
            {
              name: "My-series",
              data: this.hourlyCoagulationscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyCoagulationlabel
          }
        };
      }else if(this.Coagulationbuttonvalue == 'Delta'){
        this.chartOptionsCoagulation = {
          series: [
            {
              name: "My-series",
              data: this.deltaCoagulationscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaCoagulationlabel
          }
        };
      }
    }
  }
  gridClick5(e){
    let value = e.target.value;
    this.isSplitdateShownKidney = false;
    if(value == "grid"){
      this.isgridfive = true;
      this.isgraphfive = false;
      this.isdropdownclickfive = true;
    }else if(value == "graph"){
      this.isgridfive = false;
      this.isgraphfive = true;
      this.isdropdownclickfive = true;

      if(this.kidneybuttonvalue == 'Daily'){
        this.chartOptionsKidney = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourKidney
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelist
          }
        };
      }else if(this.kidneybuttonvalue == 'Hourly'){
        this.chartOptionsKidney = {
          series: [
            {
              name: "My-series",
              data: this.hourlykidneyscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlykidneylabel
          }
        };
      }else if(this.kidneybuttonvalue == 'Delta'){
        this.chartOptionsKidney = {
          series: [
            {
              name: "My-series",
              data: this.deltakidneyscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltakidneylabel
          }
        };
      }
      
    }
  }

  newsofascore(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION
    };
    let dialogref = this.dialog.open(SofascoreeleoneComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      
      // this.SofaScoredata = res.data;
      /* this.bottomLabel = res.data;
      this.needleValue = res.data; */
    });
  }

  


  editsofascore(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION
    };
    let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      
      // this.SofaScoredata = res.data;
      /* this.bottomLabel = res.data;
      this.needleValue = res.data; */
    });
  }

  getSofaUpdateValues(entrydatevalue){
    this.entrydate = this.datePipe.transform(entrydatevalue.value, 'dd-MMM-yyyy');
    this.http.get(this.rootURL+ '/GetUpdateNoSofaScore', 
      {params : { MRNO : this.MRNO.toString(), BEDNO: this.BEDNO.toString(), Entrydate: this.entrydate, VISIT_ID: '1'
        , STATUS : '1'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 
  }

  dateValueChanged(date: any) {  
    console.log('date value changed');
    console.log(date.value);
    this.entrydate = this.datePipe.transform(date.value, 'dd-MM-yyyy');
    let dateFormatUpdateno = this.datePipe.transform(date.value, 'dd-MMM-yyyy');
    this.http.get(this.rootURL+ '/GetUpdateNoSofaScore', 
      {params : { MRNO : this.MRNO.toString(), BEDNO: this.BEDNO.toString(), Entrydate: dateFormatUpdateno, VISIT_ID: '1'
        , STATUS : '1'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        
        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 

      let boolKidney :boolean = false;
      let boolLiver: boolean = false;
      let boolResp: boolean = false;
      let boolNerv : boolean = false;
      let boolCoag: boolean = false;
      let noRecordFound : boolean = true;

      this.h1.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: this.entrydate, Action: '1'
          , sofaname : 'KIDNEY'
                    } } 
        ).subscribe(res => {
          this.kidneySofaMain = JSON.parse(JSON.stringify(res));
          this.KidneyValue = this.kidneySofaMain[0].CREATININE;
          this.calculatePointsKidney();
          boolKidney = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h2.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  this.entrydate, Action: '1'
          , sofaname : 'COAGULATION'
                    } } 
        ).subscribe(res => {
          if(JSON.parse(JSON.stringify(res)) != 'No record found'){
          this.coagulationSofaMain = JSON.parse(JSON.stringify(res));
          this.CoagulationValue = this.coagulationSofaMain[0].PLATELETS;
          this.calculatePointsCoagulation();
          }else{
            noRecordFound = true;
          }
          boolCoag = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h3.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  this.entrydate, Action: '1'
          , sofaname : 'LIVER'
                    } } 
        ).subscribe(res => {
          this.liverSofaMain = JSON.parse(JSON.stringify(res));
          this.LiverValue = this.liverSofaMain[0].BILLIRUBIN;
          this.calculatePointsLiver();
          boolLiver = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h4.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  this.entrydate, Action: '1'
          , sofaname : 'NERVOUS'
                    } } 
        ).subscribe(res => {
          this.nervousSofaMain = JSON.parse(JSON.stringify(res));
          this.NervValue = this.nervousSofaMain[0].GLASGOW_COMA_SCALE;
          this.calculatePointsNerv();
          boolNerv = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  this.entrydate, Action: '1'
          , sofaname : 'RESP'
                    } } 
        ).subscribe(res => {
          this.respSofaMain = JSON.parse(JSON.stringify(res));
          this.ResValue = this.respSofaMain[0].PaO2Fio2;
          
          this.calculatePointsResp();
          boolResp = true;
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        });

        interval(7000)//.pipe(takeWhile(() => !boolKidney || !boolLiver || !boolNerv || !boolResp || !boolCoag))
        .subscribe(i => { 
          // This will be called every 10 seconds until `stopCondition` flag is set to true
          this.calculatePoints();
      });
                  
        
      
        

}

onChange(e){
  let value = e.target.value;
  this.http.get(this.rootURL+ '/GetUpdateValues_SOFA', 
      {params : { MRNO : this.MRNO.toString(), BEDNO: this.BEDNO.toString(), Entrydate: this.entrydate.toString(), VISIT_ID: '1'
        , STATUS : '1', UPDATENO: value
                  } } 
      ).subscribe(res => {
        this.items = JSON.parse(JSON.stringify(res));
        this.KidneyValue = this.items.Creatinine;
        this.LiverValue = this.items.BilliRubin;
        this.NervValue = this.items.GlasgowComaScale;
        this.ResValue = this.items.PaO2Fio2;
        this.dataventilated = this.items.IsVentilated;
        this.CoagulationValue = this.items.Platelets;

        this.calculatePointsCoagulation();
        this.calculatePointsKidney();
        this.calculatePointsLiver();
        this.calculatePointsNerv();
        this.calculatePointsResp();
        this.calculatePoints();




        
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      });
}


kidneydataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Kidney',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.KidneyValue = res.datavalue;
    this.KidneyPoint = res.score;

    let value = parseFloat( ((this.KidneyPoint * 100)/ 
    (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString());
    this.KidneyPer = value.toString() + '%'; 
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickkidney(data){
  this.isSplitdateShownKidney = true;
  
  this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '2'
          , sofaname : 'KIDNEY'
                    } } 
        ).subscribe(res => {
          this.detailedKidney = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

kidneydailyscorebutton(){
  this.isSplitdateShownKidney = false;
  this.isdailykidneyshown = true;
  this.ishourlykidneyshown = false;
  this.isdeltakidneyshown = false;
  this.kidneybuttonvalue = 'Daily';
  this.h3.get(this.rootURL+ '/GetSofaKidneyDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourKidney = new Array();
          this.datelist = new Array();
          tempdata.forEach(data => {
            
            this.datelist.push(data.READTIME);
            this.dailyhourKidney.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

kidneyhourlycorebutton(){
  this.isSplitdateShownKidney = false;
  this.isdailykidneyshown = false;
  this.ishourlykidneyshown = true;
  this.isdeltakidneyshown = false;
  this.kidneybuttonvalue = 'Hourly';
  this.h3.get(this.rootURL+ '/GetSofaHourly', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'KIDNEY' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlykidneylabel = new Array();
          this.hourlykidneyscore = new Array();

          for(let keydata in keys){
            this.hourlykidneylabel.push(keys[keydata]);
            this.hourlykidneyscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

kidneydeltascorebutton(){
  this.isSplitdateShownKidney = false;
  this.isdailykidneyshown = false;
  this.ishourlykidneyshown = false;
  this.isdeltakidneyshown = true;
  this.kidneybuttonvalue = 'Delta';
  this.h3.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'KIDNEY' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltakidneylabel = new Array();
          this.deltakidneyscore = new Array();
          for(let keydata in keys){
            this.deltakidneylabel.push(keys[keydata]);
            this.deltakidneyscore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

kidneyclick(){
  this.isdropdownclickfive = !this.isdropdownclickfive;
  if(this.isdropdownclickfive){
    this.isgridfive = true;
    this.isgraphfive = false;
  }else{
    this.isgridfive = false;
    this.isgraphfive = false;
  }

  this.h3.get(this.rootURL+ '/GetSofaKidneyDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourKidney = new Array();
          tempdata.forEach(data => {
            
            this.datelist.push(data.READTIME);
            this.dailyhourKidney.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

  
  

}

coagdataclick(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Coagulation',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.CoagulationValue = res.datavalue;
    this.CoagulationPoint = res.score;

    let value = parseFloat( ((this.CoagulationPoint * 100)/ 
    (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString());
    this.CoagulationPer = value.toString()+ '%';
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickcoag(data){
  this.isSplitdateShownCoagulation = true;
  
  this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '2'
          , sofaname : 'COAGULATION'
                    } } 
        ).subscribe(res => {
          this.detailedCoagulation = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

coagdailyscorebutton(){
  this.isSplitdateShownCoagulation = false;
  this.isdailyCoagulationshown = true;
  this.ishourlyCoagulationshown = false;
  this.isdeltaCoagulationshown = false;
  this.Coagulationbuttonvalue = 'Daily';
  this.h3.get(this.rootURL+ '/GetSofaCoagulationDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourCoagulation = new Array();
          this.datelistCoagulation = new Array();
          tempdata.forEach(data => {
            
            this.datelistCoagulation.push(data.READTIME);
            this.dailyhourCoagulation.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

coaghourlycorebutton(){
  this.isSplitdateShownCoagulation = false;
  this.isdailyCoagulationshown = false;
  this.ishourlyCoagulationshown = true;
  this.isdeltaCoagulationshown = false;
  this.Coagulationbuttonvalue = 'Hourly';
  this.h3.get(this.rootURL+ '/GetSofaHourly', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'COAGULATION' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyCoagulationlabel = new Array();
          this.hourlyCoagulationscore = new Array();

          for(let keydata in keys){
            this.hourlyCoagulationlabel.push(keys[keydata]);
            this.hourlyCoagulationscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

coagdeltascorebutton(){
  this.isSplitdateShownCoagulation = false;
  this.isdailyCoagulationshown = false;
  this.ishourlyCoagulationshown = false;
  this.isdeltaCoagulationshown = true;
  this.Coagulationbuttonvalue = 'Delta';
  this.h3.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'COAGULATION' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaCoagulationlabel = new Array();
          this.deltaCoagulationscore = new Array();
          for(let keydata in keys){
            this.deltaCoagulationlabel.push(keys[keydata]);
            this.deltaCoagulationscore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

coagulationclick(){

  this.isdropdownclickfour = !this.isdropdownclickfour;
    if(this.isdropdownclickfour){
      this.isgridfour = true;
      this.isgraphfour = false;
    }else{
      this.isgridfour = false;
      this.isgraphfour = false;
    }

    this.h3.get(this.rootURL+ '/GetSofaCoagulationDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourCoagulation = new Array();
          tempdata.forEach(data => {
            
            this.datelistCoagulation.push(data.READTIME);
            this.dailyhourCoagulation.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

}

cardiodataclick(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Cardiovascular(MAP)',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION
  };
  let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.CardiovascularValue = res.datavalue;
    this.CardiovascularPoint = res.score;

    let value = parseFloat( ((this.CardiovascularPoint * 100)/ 
    (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString());
    this.CardiovascularPer = value.toString()+ '%';
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}
cardioclick(){

}

resdataclick(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "40%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Respiratory System',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.ResValue = res.datavalue;
    this.ResPoint = res.score;

    let value = parseFloat( ((this.ResPoint * 100)/ 
    (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString());
    this.ResPer = value.toString()+ '%';
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickresp(data){
  this.isSplitdateShownResp = true;
  
  this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '2'
          , sofaname : 'RESP'
                    } } 
        ).subscribe(res => {
          this.detailedResp = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

respdailyscorebutton(){
  this.isSplitdateShownKidney = false;
  this.isdailykidneyshown = true;
  this.ishourlykidneyshown = false;
  this.isdeltakidneyshown = false;
  this.kidneybuttonvalue = 'Daily';
  this.h3.get(this.rootURL+ '/GetSofaRespDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourResp = new Array();
          this.datelistResp = new Array();
          tempdata.forEach(data => {
            
            this.datelistResp.push(data.READTIME);
            this.dailyhourResp.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

resphourlycorebutton(){
  this.isSplitdateShownResp = false;
  this.isdailyRespshown = false;
  this.ishourlyRespshown = true;
  this.isdeltaRespshown = false;
  this.Respbuttonvalue = 'Hourly';
  this.h3.get(this.rootURL+ '/GetSofaHourly', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'RESP' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyResplabel = new Array();
          this.hourlyRespscore = new Array();

          for(let keydata in keys){
            this.hourlyResplabel.push(keys[keydata]);
            this.hourlyRespscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

respdeltascorebutton(){
  this.isSplitdateShownResp = false;
  this.isdailyRespshown = false;
  this.ishourlyRespshown = false;
  this.isdeltaRespshown = true;
  this.Respbuttonvalue = 'Delta';
  this.h3.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'RESP' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaResplabel = new Array();
          this.deltaRespscore = new Array();
          for(let keydata in keys){
            this.deltaResplabel.push(keys[keydata]);
            this.deltaRespscore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

respclick(){
  this.isdropdownclickone = !this.isdropdownclickone;
  if(this.isdropdownclickone){
    this.isgridone = true;
    this.isgraphone = false;
  }else{
    this.isgridone = false;
    this.isgraphone = false;
  }
  this.h3.get(this.rootURL+ '/GetSofaRespDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourResp = new Array();
          tempdata.forEach(data => {
            
            this.datelistResp.push(data.READTIME);
            this.dailyhourResp.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

}

nervdataclick(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Nervous System',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.NervValue = res.datavalue;
    this.NervPoint = res.score;

    let value = parseFloat( ((this.NervPoint * 100)/ 
    (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString());
    this.NervPer = value.toString()+ '%';
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickNerv(data){
  this.isSplitdateShownNervous = true;
  
  this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '2'
          , sofaname : 'NERVOUS'
                    } } 
        ).subscribe(res => {
          this.detailedNervous = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

Nervdailyscorebutton(){
  this.isSplitdateShownNervous = false;
  this.isdailyNervousshown = true;
  this.ishourlyNervousshown = false;
  this.isdeltaNervousshown = false;
  this.Nervousbuttonvalue = 'Daily';
  this.h3.get(this.rootURL+ '/GetSofaNervousDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourNervous = new Array();
          this.datelistNervous = new Array();
          tempdata.forEach(data => {
            
            this.datelistNervous.push(data.READTIME);
            this.dailyhourNervous.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

Nervhourlycorebutton(){
  this.isSplitdateShownNervous = false;
  this.isdailyNervousshown = false;
  this.ishourlyNervousshown = true;
  this.isdeltaNervousshown = false;
  this.Nervousbuttonvalue = 'Hourly';
  this.h3.get(this.rootURL+ '/GetSofaHourly', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'NERVOUS' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyNervouslabel = new Array();
          this.hourlyNervousscore = new Array();

          for(let keydata in keys){
            this.hourlyNervouslabel.push(keys[keydata]);
            this.hourlyNervousscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

Nervdeltascorebutton(){
  this.isSplitdateShownNervous = false;
  this.isdailyNervousshown = false;
  this.ishourlyNervousshown = false;
  this.isdeltaNervousshown = true;
  this.Nervousbuttonvalue = 'Delta';
  this.h3.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'NERVOUS' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaNervouslabel = new Array();
          this.deltaNervousscore = new Array();
          for(let keydata in keys){
            this.deltaNervouslabel.push(keys[keydata]);
            this.deltaNervousscore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}



nervousclick(){
  this.isdropdownclicktwo = !this.isdropdownclicktwo;
    if(this.isdropdownclicktwo){
      this.isgridtwo = true;
      this.isgraphtwo = false;
    }else{
      this.isgridtwo = false;
      this.isgraphtwo = false;
    }

    this.h3.get(this.rootURL+ '/GetSofaNervousDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourNervous = new Array();
          tempdata.forEach(data => {
            
            this.datelistNervous.push(data.READTIME);
            this.dailyhourNervous.push(data.SCORE);
            
          });
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

}

liverdataclick(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Liver',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(SofascoreeletwoComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.LiverValue = res.datavalue;
    this.LiverPoint = res.score;

    let value = parseFloat( ((this.LiverPoint * 100)/ 
    (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString());
    this.LiverPer = value.toString()+ '%';
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}
dailyclickliver(data){
  this.isSplitdateShownLiver = true;
  
  this.h5.get(this.rootURL+ '/GetSofaDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '2'
          , sofaname : 'LIVER'
                    } } 
        ).subscribe(res => {
          this.detailedLiver = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

liverdailyscorebutton(){
  this.isSplitdateShownLiver = false;
  this.isdailyLivershown = true;
  this.ishourlyLivershown = false;
  this.isdeltaLivershown = false;
  this.Liverbuttonvalue = 'Daily';
  this.h3.get(this.rootURL+ '/GetSofaLiverDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourLiver = new Array();
          this.datelistLiver = new Array();
          tempdata.forEach(data => {
            
            this.datelistLiver.push(data.READTIME);
            this.dailyhourLiver.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

liverhourlycorebutton(){
  this.isSplitdateShownLiver = false;
  this.isdailyLivershown = false;
  this.ishourlyLivershown = true;
  this.isdeltaLivershown = false;
  this.Liverbuttonvalue = 'Hourly';
  this.h3.get(this.rootURL+ '/GetSofaHourly', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'LIVER' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyLiverlabel = new Array();
          this.hourlyLiverscore = new Array();

          for(let keydata in keys){
            this.hourlyLiverlabel.push(keys[keydata]);
            this.hourlyLiverscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

liverdeltascorebutton(){
  this.isSplitdateShownLiver = false;
  this.isdailyLivershown = false;
  this.ishourlyLivershown = false;
  this.isdeltaLivershown = true;
  this.Liverbuttonvalue = 'Delta';
  this.h3.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'LIVER' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaLiverlabel = new Array();
          this.deltaLiverscore = new Array();
          for(let keydata in keys){
            this.deltaLiverlabel.push(keys[keydata]);
            this.deltaLiverlabel.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

liverclick(){
  this.isdropdownclickthree = !this.isdropdownclickthree;
    if(this.isdropdownclickthree){
      this.isgridthree = true;
      this.isgraphthree = false;
    }else{
      this.isgridthree = false;
      this.isgraphthree = false;
    }

    this.h3.get(this.rootURL+ '/GetSofaLiverDaywiseSplitup', 
        {params : { MRNO : this.MRNO.toString() } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourLiver = new Array();
          tempdata.forEach(data => {
            
            this.datelistLiver.push(data.READTIME);
            this.dailyhourLiver.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

}

calculatePointsKidney(){
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
}

calculatePointsResp(){
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
}

calculatePointsNerv(){
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
}

calculatePointsLiver(){
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
}

calculatePointsCoagulation(){
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
}

calculatePoints(){

  let value = parseFloat( ((this.KidneyPoint * 100)/ 
  (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString()).toFixed(2);
  this.KidneyPer = value.toString() + '%'; 

  let value1 = parseFloat( ((this.LiverPoint * 100)/ 
  (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString()).toFixed(2);
  this.LiverPer = value1.toString() + '%'; 

  let value2 = parseFloat( ((this.ResPoint * 100)/ 
  (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString()).toFixed(2);
  this.ResPer = value2.toString() + '%'; 

  let value3 = parseFloat( ((this.CoagulationPoint * 100)/ 
  (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString()).toFixed(2);
  this.CoagulationPer = value3.toString() + '%'; 

  let value4 = parseFloat( ((this.NervPoint * 100)/ 
  (this.KidneyPoint + this.LiverPoint + this.NervPoint + this.ResPoint + this.CoagulationPoint + this.CardiovascularPoint)).toString()).toFixed(2);
  this.NervPer = value4.toString() + '%'; 
}

}
