import { AppacheeditmodeComponent } from './../appacheeditmode/appacheeditmode.component';
import { AppacheentrymodeComponent } from './../appacheentrymode/appacheentrymode.component';
import { NumberValueAccessor, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule, MatNativeDateModule, MatDatepickerInputEvent } from "@angular/material";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

export type chartOptionsTemperature = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsMeanArterialRate = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsHeartRate = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsRespiratoryRate = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsArterialRate = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsWBC = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

export type chartOptionsSeriumSodium = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  
};

@Component({
  selector: 'app-appachescore',
  templateUrl: './appachescore.component.html',
  styleUrls: ['./appachescore.component.css']
})
export class AppachescoreComponent implements OnInit {

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
  dataventilated: boolean = false;
  entrydate: any;
  responseData: any;
  items:any;
  AppacheScoredata: number = 0;
  TemperatureAppacheMain: any;
  MeanArterialRateAppacheMain: any;
  HeartRateAppacheMain: any;
  RespiratoryRateAppacheMain: any;
  ArterialRateAppacheMain: any;
  WBCAppacheMain: any;
  SeriumSodiumAppacheMain: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";
  todaydate: Date;
  

  //adata: ['Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana']; 
  dailyhourTemperature:any;
  hourlyTemperature:any;
  hourlyTemperaturescore:any;
  hourlyTemperaturelabel:any;
  deltaTemperature:any;
  deltaTemperaturescore:any;
  deltaTemperaturelabel:any;
  datelist: string[] = [];
  isSplitdateShownTemperature: boolean = false;
  isdailyTemperatureshown: boolean = true;
  ishourlyTemperatureshown: boolean = false;
  isdeltaTemperatureshown: boolean = false;
  detailedTemperature: any;
  Temperaturebuttonvalue: string = 'Daily';


  dailyhourMeanArterialRate:any;
  hourlyMeanArterialRate:any;
  hourlyMeanArterialRatescore:any;
  hourlyMeanArterialRatelabel:any;
  deltaMeanArterialRate:any;
  deltaMeanArterialRatescore:any;
  deltaMeanArterialRatelabel:any;
  datelistMeanArterialRate: string[] = [];
  isSplitdateShownMeanArterialRate: boolean = false;
  isdailyMeanArterialRateshown: boolean = true;
  ishourlyMeanArterialRateshown: boolean = false;
  isdeltaMeanArterialRateshown: boolean = false;
  detailedMeanArterialRate: any;
  MeanArterialRatebuttonvalue: string = 'Daily';

  dailyhourHeartRate:any;
  hourlyHeartRate:any;
  hourlyHeartRatescore:any;
  hourlyHeartRatelabel:any;
  deltaHeartRate:any;
  deltaHeartRatescore:any;
  deltaHeartRatelabel:any;
  datelistHeartRate: string[] = [];
  isSplitdateShownHeartRate: boolean = false;
  isdailyHeartRateshown: boolean = true;
  ishourlyHeartRateshown: boolean = false;
  isdeltaHeartRateshown: boolean = false;
  detailedHeartRate: any;
  HeartRatebuttonvalue: string = 'Daily';

  dailyhourRespiratoryRate:any;
  hourlyRespiratoryRate:any;
  hourlyRespiratoryRatescore:any;
  hourlyRespiratoryRatelabel:any;
  deltaRespiratoryRate:any;
  deltaRespiratoryRatescore:any;
  deltaRespiratoryRatelabel:any;
  datelistRespiratoryRate: string[] = [];
  isSplitdateShownRespiratoryRate: boolean = false;
  isdailyRespiratoryRateshown: boolean = true;
  ishourlyRespiratoryRateshown: boolean = false;
  isdeltaRespiratoryRateshown: boolean = false;
  detailedRespiratoryRate: any;
  RespiratoryRatebuttonvalue: string = 'Daily';


  dailyhourArterialRate:any;
  hourlyArterialRate:any;
  hourlyArterialRatescore:any;
  hourlyArterialRatelabel:any;
  deltaArterialRate:any;
  deltaArterialRatescore:any;
  deltaArterialRatelabel:any;
  datelistArterialRate: string[] = [];
  isSplitdateShownArterialRate: boolean = false;
  isdailyArterialRateshown: boolean = true;
  ishourlyArterialRateshown: boolean = false;
  isdeltaArterialRateshown: boolean = false;
  detailedArterialRate: any;
  ArterialRatebuttonvalue: string = 'Daily';

  dailyhourWBC:any;
  hourlyWBC:any;
  hourlyWBCscore:any;
  hourlyWBClabel:any;
  deltaWBC:any;
  deltaWBCscore:any;
  deltaWBClabel:any;
  datelistWBC: string[] = [];
  isSplitdateShownWBC: boolean = false;
  isdailyWBCshown: boolean = true;
  ishourlyWBCshown: boolean = false;
  isdeltaWBCshown: boolean = false;
  detailedWBC: any;
  WBCbuttonvalue: string = 'Daily';
  
  dailyhourSeriumSodium:any;
  hourlySeriumSodium:any;
  hourlySeriumSodiumscore:any;
  hourlySeriumSodiumlabel:any;
  deltaSeriumSodium:any;
  deltaSeriumSodiumscore:any;
  deltaSeriumSodiumlabel:any;
  datelistSeriumSodium: string[] = [];
  isSplitdateShownSeriumSodium: boolean = false;
  isdailySeriumSodiumshown: boolean = true;
  ishourlySeriumSodiumshown: boolean = false;
  isdeltaSeriumSodiumshown: boolean = false;
  detailedSeriumSodium: any;
  SeriumSodiumbuttonvalue: string = 'Daily';


  isDailyhourTemperature: boolean = false;
  isDailyhourMeanArterialRate: boolean = false;
  isDailyhourHeartRate: boolean = false;
  isDailyhourRespiratoryRate: boolean = false;
  isDailyhourArterialRate: boolean = false;
  isDailyhourWBC: boolean = false;
  isDailyhourSeriumSodium: boolean = false;


  mapreadby: string = '299'
  tempreadby: string = '299'
  heartratereadby : string = '299'
  respiratoryratereadby: string = '299'
  arterialratereadby : string = '299'
  potassiumreadby : string = '299'
  seriumsodiumreadby : string = '299'

  mapreadtime: string = ''
  tempreadtime: string = ''
  heartratereadtime : string = ''
  respiratoryratereadtime: string = ''
  arterialratereadtime : string = ''
  potassiumreadtime : string = ''
  seriumsodiumreadtime : string = ''
  


  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptionsTemperature: Partial<chartOptionsTemperature>;
  public chartOptionsMeanArterialRate: Partial<chartOptionsMeanArterialRate>;
  public chartOptionsHeartRate: Partial<chartOptionsHeartRate>;
  public chartOptionsRespiratoryRate: Partial<chartOptionsRespiratoryRate>;
  public chartOptionsArterialRate: Partial<chartOptionsArterialRate>;
  public chartOptionsWBC: Partial<chartOptionsWBC>;
  public chartOptionsSeriumSodium: Partial<chartOptionsSeriumSodium>;

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


  constructor(private dialogRef : MatDialogRef<AppachescoreComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data, private datePipe: DatePipe, private h1 : HttpClient, private h2: HttpClient,
  private h3: HttpClient, private h4 : HttpClient, private h5: HttpClient, private h6: HttpClient, private h7: HttpClient, private dialog: MatDialog) {
      this.MRNO = data.MRNO;
      this.BEDNO = data.BEDNO;
      this.LOCATION = data.LOCATION;
      if(this.MRNO > 0){
        this.todaydate = new Date();
      }


      this.chartOptionsTemperature = {
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

      this.chartOptionsMeanArterialRate = {
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

      this.chartOptionsHeartRate = {
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

      this.chartOptionsRespiratoryRate = {
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

      this.chartOptionsArterialRate = {
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

      this.chartOptionsWBC = {
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

      this.chartOptionsSeriumSodium = {
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
    //this.resetForm();

    let formattedDate = this.datePipe.transform(this.todaydate, 'dd-MM-yyyy');


    this.h1.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: formattedDate, Action: '1'
          , appachename : 'MeanArterialRate'
                    } } 
        ).subscribe(res => {
          this.MeanArterialRateAppacheMain = JSON.parse(JSON.stringify(res));
          this.MeanArterialRateValue = this.MeanArterialRateAppacheMain[0].MEAN_ARTERIAL_PRESSURE;
          this.MeanArterialRatePoint = this.MeanArterialRateAppacheMain[0].SCORE;
          //this.calculatePointsKidney();
          //boolKidney = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h2.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  formattedDate, Action: '1'
          , appachename : 'Temperature'
                    } } 
        ).subscribe(res => {
          console.log(JSON.parse(JSON.stringify(res)));
          console.log(formattedDate);
          if(JSON.parse(JSON.stringify(res)) != 'No record found'){
          this.TemperatureAppacheMain = JSON.parse(JSON.stringify(res));
          this.TemperatureValue = this.TemperatureAppacheMain[0].TEMPERATURE;
          this.TemperaturePoint = this.TemperatureAppacheMain[0].SCORE;
          //this.calculatePointsCoagulation();
          }else{
            //noRecordFound = true;
          }
          //boolCoag = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
  }

  resetForm(form?: NgForm){
    /* if(form != null)
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
    } */
  }
  

  

  onNoClick(){
    this.dialogRef.close({data: this.responseData});
  }

  onSubmit(form: NgForm){
    this.getAppache(form);
  }


  getAppache(formdata: NgForm){
    console.log(formdata.value);
     this.http.get(this.rootURL+ '/CreateAppacheEntry', 
      {params : { BEDNO : this.BEDNO.toString(), MRNO: this.MRNO.toString(), ARTERIAL_RATE: formdata.value.ARTERIAL_RATE
        , SERUM_CREATININE: formdata.value.SERUM_CREATININE,
        HEMATOCRIT: formdata.value.HEMATOCRIT, MEAN_ARTERIAL_PRESSURE: formdata.value.MEAN_ARTERIAL_PRESSURE, 
        SERUM_POTASSIUM: formdata.value.SERUM_POTASSIUM
                  , RESPIRATORY_RATE : formdata.value.RESPIRATORY_RATE,
                  TEMPERATURE: formdata.value.TEMPERATURE,WBC: formdata.value.WBC , SERUM_SODIUM: formdata.value.SERUM_SODIUM
                  , HEARTRATE : formdata.value.HEARTRATE,LOCATION : this.LOCATION.toString(),READBY : '299'
                  ,ACTION : '1', VISIT_ID : '1' 
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
        this.dialogRef.close({data:this.responseData});
        this.resetForm(formdata);
        
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      }); 
    
  }


  gridClick(e){
    let value = e.target.value;
    this.isSplitdateShownTemperature = false;
    if(value == "grid"){
      this.isgridone = true;
      this.isgraphone = false;
      this.isdropdownclickone = true;
    }else if(value == "graph"){
      this.isgridone = false;
      this.isgraphone = true;
      this.isdropdownclickone = true;

      if(this.Temperaturebuttonvalue == 'Daily'){
        this.chartOptionsTemperature = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourTemperature
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
      }else if(this.Temperaturebuttonvalue == 'Hourly'){
        this.chartOptionsTemperature = {
          series: [
            {
              name: "My-series",
              data: this.hourlyTemperaturescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyTemperaturelabel
          }
        };
      }else if(this.Temperaturebuttonvalue == 'Delta'){
        this.chartOptionsTemperature = {
          series: [
            {
              name: "My-series",
              data: this.deltaTemperaturescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaTemperaturelabel
          }
        };
      }
    }
  }
  gridClick2(e){
    let value = e.target.value;
    this.isSplitdateShownMeanArterialRate = false;
    if(value == "grid"){
      this.isgridtwo = true;
      this.isgraphtwo = false;
      this.isdropdownclicktwo = true;
    }else if(value == "graph"){
      this.isgridtwo = false;
      this.isgraphtwo = true;
      this.isdropdownclicktwo = true;

      if(this.MeanArterialRatebuttonvalue == 'Daily'){
        this.chartOptionsMeanArterialRate = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourMeanArterialRate
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistMeanArterialRate
          }
        };
      }else if(this.MeanArterialRatebuttonvalue == 'Hourly'){
        this.chartOptionsMeanArterialRate = {
          series: [
            {
              name: "My-series",
              data: this.hourlyMeanArterialRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyMeanArterialRatelabel
          }
        };
      }else if(this.MeanArterialRatebuttonvalue == 'Delta'){
        this.chartOptionsMeanArterialRate= {
          series: [
            {
              name: "My-series",
              data: this.deltaMeanArterialRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaMeanArterialRatelabel
          }
        };
      }
    }
  }
  gridClick3(e){
    let value = e.target.value;
    this.isSplitdateShownHeartRate = false;
    if(value == "grid"){
      this.isgridthree = true;
      this.isgraphthree = false;
      this.isdropdownclickthree = true;
    }else if(value == "graph"){
      this.isgridthree = false;
      this.isgraphthree = true;
      this.isdropdownclickthree = true;

      if(this.HeartRatebuttonvalue == 'Daily'){
        this.chartOptionsHeartRate = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourHeartRate
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistHeartRate
          }
        };
      }else if(this.HeartRatebuttonvalue == 'Hourly'){
        this.chartOptionsHeartRate = {
          series: [
            {
              name: "My-series",
              data: this.hourlyHeartRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyHeartRatelabel
          }
        };
      }else if(this.HeartRatebuttonvalue == 'Delta'){
        this.chartOptionsHeartRate = {
          series: [
            {
              name: "My-series",
              data: this.deltaHeartRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaHeartRatelabel
          }
        };
      }
    }
  }

  gridClick4(e){
    let value = e.target.value;
    this.isSplitdateShownRespiratoryRate = false;
    if(value == "grid"){
      this.isgridfour = true;
      this.isgraphfour = false;
      this.isdropdownclickfour = true;
    }else if(value == "graph"){
      this.isgridfour = false;
      this.isgraphfour = true;
      this.isdropdownclickfour = true;

      if(this.RespiratoryRatebuttonvalue == 'Daily'){
        this.chartOptionsRespiratoryRate = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourRespiratoryRate
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.datelistRespiratoryRate
          }
        };
      }else if(this.RespiratoryRatebuttonvalue == 'Hourly'){
        this.chartOptionsRespiratoryRate = {
          series: [
            {
              name: "My-series",
              data: this.hourlyRespiratoryRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyRespiratoryRatelabel
          }
        };
      }else if(this.RespiratoryRatebuttonvalue == 'Delta'){
        this.chartOptionsRespiratoryRate = {
          series: [
            {
              name: "My-series",
              data: this.deltaRespiratoryRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaRespiratoryRatelabel
          }
        };
      }
    }
  }
  gridClick5(e){
    let value = e.target.value;
    this.isSplitdateShownArterialRate = false;
    if(value == "grid"){
      this.isgridfive = true;
      this.isgraphfive = false;
      this.isdropdownclickfive = true;
    }else if(value == "graph"){
      this.isgridfive = false;
      this.isgraphfive = true;
      this.isdropdownclickfive = true;

      if(this.ArterialRatebuttonvalue == 'Daily'){
        this.chartOptionsArterialRate = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourArterialRate
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
      }else if(this.ArterialRatebuttonvalue == 'Hourly'){
        this.chartOptionsArterialRate = {
          series: [
            {
              name: "My-series",
              data: this.hourlyArterialRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyArterialRatelabel
          }
        };
      }else if(this.ArterialRatebuttonvalue == 'Delta'){
        this.chartOptionsArterialRate = {
          series: [
            {
              name: "My-series",
              data: this.deltaArterialRatescore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaArterialRatelabel
          }
        };
      }
      
    }
  }


  gridClick6(e){
    let value = e.target.value;
    this.isSplitdateShownWBC = false;
    if(value == "grid"){
      this.isgridfive = true;
      this.isgraphfive = false;
      this.isdropdownclickfive = true;
    }else if(value == "graph"){
      this.isgridfive = false;
      this.isgraphfive = true;
      this.isdropdownclickfive = true;

      if(this.WBCbuttonvalue == 'Daily'){
        this.chartOptionsWBC = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourWBC
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
      }else if(this.WBCbuttonvalue == 'Hourly'){
        this.chartOptionsWBC = {
          series: [
            {
              name: "My-series",
              data: this.hourlyWBCscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlyWBClabel
          }
        };
      }else if(this.WBCbuttonvalue == 'Delta'){
        this.chartOptionsWBC = {
          series: [
            {
              name: "My-series",
              data: this.deltaWBCscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaWBClabel
          }
        };
      }
      
    }
  }


  gridClick7(e){
    let value = e.target.value;
    this.isSplitdateShownSeriumSodium = false;
    if(value == "grid"){
      this.isgridfive = true;
      this.isgraphfive = false;
      this.isdropdownclickfive = true;
    }else if(value == "graph"){
      this.isgridfive = false;
      this.isgraphfive = true;
      this.isdropdownclickfive = true;

      if(this.SeriumSodiumbuttonvalue == 'Daily'){
        this.chartOptionsSeriumSodium = {
          series: [
            {
              name: "My-series",
              data: this.dailyhourSeriumSodium
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
      }else if(this.SeriumSodiumbuttonvalue == 'Hourly'){
        this.chartOptionsSeriumSodium = {
          series: [
            {
              name: "My-series",
              data: this.hourlySeriumSodiumscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.hourlySeriumSodiumlabel
          }
        };
      }else if(this.SeriumSodiumbuttonvalue == 'Delta'){
        this.chartOptionsSeriumSodium = {
          series: [
            {
              name: "My-series",
              data: this.deltaSeriumSodiumscore
            }
          ],
          chart: {
            height: 150,
            type: "bar"
          },
          xaxis: {
            categories: this.deltaSeriumSodiumlabel
          }
        };
      }
      
    }
  }


  newappachescore(){
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
    let dialogref = this.dialog.open(AppacheentrymodeComponent, dialogConfig);
    //dialogref.afterClosed().subscribe(res => {
      
      // this.SofaScoredata = res.data;
      /* this.bottomLabel = res.data;
      this.needleValue = res.data; */
    //});
  }

  dateValueChanged(date: any) {  
    console.log('date value changed');
    console.log(date.value);
    this.entrydate = this.datePipe.transform(date.value, 'dd-MM-yyyy');
    let dateFormatUpdateno = this.datePipe.transform(date.value, 'dd-MMM-yyyy');
    /* this.http.get(this.rootURL+ '/GetUpdateNoSofaScore', 
      {params : { MRNO : this.MRNO.toString(), BEDNO: this.BEDNO.toString(), Entrydate: dateFormatUpdateno, VISIT_ID: '1'
        , STATUS : '1'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.parse(JSON.stringify(res));
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                console.log(error.error);
      });  */

      let boolKidney :boolean = false;
      let boolLiver: boolean = false;
      let boolResp: boolean = false;
      let boolNerv : boolean = false;
      let boolCoag: boolean = false;
      let noRecordFound : boolean = true;

      this.h1.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date: this.entrydate, Action: '1'
          , appachename : 'MeanArterialRate'
                    } } 
        ).subscribe(res => {
          this.MeanArterialRateAppacheMain = JSON.parse(JSON.stringify(res));
          this.MeanArterialRateValue = this.MeanArterialRateAppacheMain[0].MEAN_ARTERIAL_PRESSURE;
          this.MeanArterialRatePoint = this.MeanArterialRateAppacheMain[0].SCORE;
          //this.calculatePointsKidney();
          //boolKidney = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        this.h2.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  this.entrydate, Action: '1'
          , appachename : 'Temperature'
                    } } 
        ).subscribe(res => {
          if(JSON.parse(JSON.stringify(res)) != 'No record found'){
          this.TemperatureAppacheMain = JSON.parse(JSON.stringify(res));
          this.TemperatureValue = this.TemperatureAppacheMain[0].TEMPERATURE;
          this.TemperaturePoint = this.TemperatureAppacheMain[0].SCORE;
          //this.calculatePointsCoagulation();
          }else{
            noRecordFound = true;
          }
          boolCoag = true;
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });

        /*this.h3.get(this.rootURL+ '/GetSofaDetailedCombo', 
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

        interval(7000)
        .subscribe(i => { 
          
          this.calculatePoints();
      }); */
                  
        
      
        

}


Temperaturedataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Temperature',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.TemperatureValue = res.datavalue;
    this.TemperaturePoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickTemperature(data){
  this.isSplitdateShownTemperature = true;
  
  this.h1.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'Temperature'
                    } } 
        ).subscribe(res => {
          this.detailedTemperature = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

Temperaturedailyscorebutton(){
  this.isSplitdateShownTemperature = false;
  this.isdailyTemperatureshown = true;
  this.ishourlyTemperatureshown = false;
  this.isdeltaTemperatureshown = false;
  this.Temperaturebuttonvalue = 'Daily';
  this.h1.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'Temperature' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourTemperature = new Array();
          this.datelist = new Array();
          tempdata.forEach(data => {
            
            this.datelist.push(data.READTIME);
            this.dailyhourTemperature.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

Temperaturehourlycorebutton(){
  this.isSplitdateShownTemperature = false;
  this.isdailyTemperatureshown = false;
  this.ishourlyTemperatureshown = true;
  this.isdeltaTemperatureshown = false;
  this.Temperaturebuttonvalue = 'Hourly';
  this.h1.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'Temperature' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyTemperaturelabel = new Array();
          this.hourlyTemperaturescore = new Array();

          for(let keydata in keys){
            this.hourlyTemperaturelabel.push(keys[keydata]);
            this.hourlyTemperaturescore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

Temperaturedeltascorebutton(){
  this.isSplitdateShownTemperature = false;
  this.isdailyTemperatureshown = false;
  this.ishourlyTemperatureshown = false;
  this.isdeltaTemperatureshown = true;
  this.Temperaturebuttonvalue = 'Delta';
  this.h1.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'KIDNEY' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaTemperaturelabel = new Array();
          this.deltaTemperaturescore = new Array();
          for(let keydata in keys){
            this.deltaTemperaturelabel.push(keys[keydata]);
            this.deltaTemperaturescore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

Temperatureclick(){
  this.isdropdownclickone = !this.isdropdownclickone;
  if(this.isdropdownclickone){
    this.isgridone = true;
    this.isgraphone = false;
  }else{
    this.isgridone = false;
    this.isgraphone = false;
  }

  this.h1.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'Temperature' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourTemperature = new Array();
          tempdata.forEach(data => {
            
            this.datelist.push(data.READTIME);
            this.dailyhourTemperature.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}


MeanArterialRatedataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Mean Arterial Rate',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.MeanArterialRateValue = res.datavalue;
    this.MeanArterialRatePoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickMeanArterialRate(data){
  this.isSplitdateShownMeanArterialRate = true;
  
  this.h2.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'MeanArterialRate'
                    } } 
        ).subscribe(res => {
          this.detailedMeanArterialRate = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

MeanArterialRatedailyscorebutton(){
  this.isSplitdateShownMeanArterialRate = false;
  this.isdailyMeanArterialRateshown = true;
  this.ishourlyMeanArterialRateshown = false;
  this.isdeltaMeanArterialRateshown = false;
  this.MeanArterialRatebuttonvalue = 'Daily';
  this.h2.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'MeanArterialRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourMeanArterialRate = new Array();
          this.datelistMeanArterialRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistMeanArterialRate.push(data.READTIME);
            this.dailyhourMeanArterialRate.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

MeanArterialRatehourlycorebutton(){
  this.isSplitdateShownMeanArterialRate = false;
  this.isdailyMeanArterialRateshown = false;
  this.ishourlyMeanArterialRateshown = true;
  this.isdeltaMeanArterialRateshown = false;
  this.MeanArterialRatebuttonvalue = 'Hourly';
  this.h2.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'KIDNEY' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyMeanArterialRatelabel = new Array();
          this.hourlyMeanArterialRatescore = new Array();

          for(let keydata in keys){
            this.hourlyMeanArterialRatelabel.push(keys[keydata]);
            this.hourlyMeanArterialRatescore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

MeanArterialRatedeltascorebutton(){
  this.isSplitdateShownMeanArterialRate = false;
  this.isdailyMeanArterialRateshown = false;
  this.ishourlyMeanArterialRateshown = false;
  this.isdeltaMeanArterialRateshown = true;
  this.MeanArterialRatebuttonvalue = 'Delta';
  this.h2.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'KIDNEY' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaMeanArterialRatelabel = new Array();
          this.deltaMeanArterialRatescore = new Array();
          for(let keydata in keys){
            this.deltaMeanArterialRatelabel.push(keys[keydata]);
            this.deltaMeanArterialRatescore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

MeanArterialRateclick(){
  this.isdropdownclicktwo = !this.isdropdownclicktwo;
  if(this.isdropdownclicktwo){
    this.isgridtwo = true;
    this.isgraphtwo = false;
  }else{
    this.isgridtwo = false;
    this.isgraphtwo = false;
  }

  this.h2.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'MeanArterialRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourMeanArterialRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistMeanArterialRate.push(data.READTIME);
            this.dailyhourMeanArterialRate.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

HeartRatedataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Heart Rate',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.HeartRateValue = res.datavalue;
    this.HeartRatePoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickHeartRate(data){
  this.isSplitdateShownMeanArterialRate = true;
  
  this.h3.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'HeartRate'
                    } } 
        ).subscribe(res => {
          this.detailedHeartRate = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

HeartRatedailyscorebutton(){
  this.isSplitdateShownHeartRate = false;
  this.isdailyHeartRateshown = true;
  this.ishourlyHeartRateshown = false;
  this.isdeltaHeartRateshown = false;
  this.HeartRatebuttonvalue = 'Daily';
  this.h3.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'HeartRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourHeartRate = new Array();
          this.datelistHeartRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistHeartRate.push(data.READTIME);
            this.dailyhourHeartRate.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

HeartRatehourlycorebutton(){
  this.isSplitdateShownHeartRate = false;
  this.isdailyHeartRateshown = false;
  this.ishourlyHeartRateshown = true;
  this.isdeltaHeartRateshown = false;
  this.HeartRatebuttonvalue = 'Hourly';
  this.h3.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'HeartRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyHeartRatelabel = new Array();
          this.hourlyHeartRatescore = new Array();

          for(let keydata in keys){
            this.hourlyHeartRatelabel.push(keys[keydata]);
            this.hourlyHeartRatescore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

HeartRatedeltascorebutton(){
  this.isSplitdateShownHeartRate = false;
  this.isdailyHeartRateshown = false;
  this.ishourlyHeartRateshown = false;
  this.isdeltaHeartRateshown = true;
  this.HeartRatebuttonvalue = 'Delta';
  this.h3.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'HeartRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaHeartRatelabel = new Array();
          this.deltaHeartRatescore = new Array();
          for(let keydata in keys){
            this.deltaHeartRatelabel.push(keys[keydata]);
            this.deltaHeartRatescore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

HeartRateclick(){
  this.isdropdownclickthree = !this.isdropdownclickthree;
  if(this.isdropdownclickthree){
    this.isgridthree = true;
    this.isgraphthree = false;
  }else{
    this.isgridthree = false;
    this.isgraphthree = false;
  }
  this.h3.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'HeartRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourHeartRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistHeartRate.push(data.READTIME);
            this.dailyhourHeartRate.push(data.SCORE);
            
          });
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}


RespiratoryRatedataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Respiratory Rate',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.RespiratoryRateValue = res.datavalue;
    this.RespiratoryRatePoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickRespiratoryRate(data){
  this.isSplitdateShownMeanArterialRate = true;
  
  this.h4.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'RespiratoryRate'
                    } } 
        ).subscribe(res => {
          this.detailedRespiratoryRate = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

RespiratoryRatedailyscorebutton(){
  this.isSplitdateShownRespiratoryRate = false;
  this.isdailyRespiratoryRateshown = true;
  this.ishourlyRespiratoryRateshown = false;
  this.isdeltaRespiratoryRateshown = false;
  this.RespiratoryRatebuttonvalue = 'Daily';
  this.h4.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'RespiratoryRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourRespiratoryRate = new Array();
          this.datelistRespiratoryRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistRespiratoryRate.push(data.READTIME);
            this.dailyhourRespiratoryRate.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

RespiratoryRatehourlycorebutton(){
  this.isSplitdateShownRespiratoryRate = false;
  this.isdailyRespiratoryRateshown = false;
  this.ishourlyRespiratoryRateshown = true;
  this.isdeltaRespiratoryRateshown = false;
  this.RespiratoryRatebuttonvalue = 'Hourly';
  this.h4.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'RespiratoryRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyRespiratoryRatelabel = new Array();
          this.hourlyRespiratoryRatescore = new Array();

          for(let keydata in keys){
            this.hourlyRespiratoryRatelabel.push(keys[keydata]);
            this.hourlyRespiratoryRatescore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

RespiratoryRatedeltascorebutton(){
  this.isSplitdateShownRespiratoryRate = false;
  this.isdailyRespiratoryRateshown = false;
  this.ishourlyRespiratoryRateshown = false;
  this.isdeltaRespiratoryRateshown = true;
  this.RespiratoryRatebuttonvalue = 'Delta';
  this.h4.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'RespiratoryRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaRespiratoryRatelabel = new Array();
          this.deltaRespiratoryRatescore = new Array();
          for(let keydata in keys){
            this.deltaRespiratoryRatelabel.push(keys[keydata]);
            this.deltaRespiratoryRatescore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

RespiratoryRateclick(){
  this.isdropdownclickfour = !this.isdropdownclickfour;
  if(this.isdropdownclickfour){
    this.isgridfour = true;
    this.isgraphfour = false;
  }else{
    this.isgridfour = false;
    this.isgraphfour = false;
  }
  this.h4.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'RespiratoryRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourRespiratoryRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistRespiratoryRate.push(data.READTIME);
            this.dailyhourRespiratoryRate.push(data.SCORE);
            
          });
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}


ArterialRatedataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Arterial Rate',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.ArterialRateValue = res.datavalue;
    this.ArterialRatePoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickArterialRate(data){
  this.isSplitdateShownMeanArterialRate = true;
  
  this.h5.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'ArterialRate'
                    } } 
        ).subscribe(res => {
          this.detailedArterialRate = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

ArterialRatedailyscorebutton(){
  this.isSplitdateShownArterialRate = false;
  this.isdailyArterialRateshown = true;
  this.ishourlyArterialRateshown = false;
  this.isdeltaArterialRateshown = false;
  this.ArterialRatebuttonvalue = 'Daily';
  this.h5.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'ArterialRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourArterialRate = new Array();
          this.datelistArterialRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistArterialRate.push(data.READTIME);
            this.dailyhourArterialRate.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

ArterialRatehourlycorebutton(){
  this.isSplitdateShownArterialRate = false;
  this.isdailyArterialRateshown = false;
  this.ishourlyArterialRateshown = true;
  this.isdeltaArterialRateshown = false;
  this.ArterialRatebuttonvalue = 'Hourly';
  this.h5.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'ArterialRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyArterialRatelabel = new Array();
          this.hourlyArterialRatescore = new Array();

          for(let keydata in keys){
            this.hourlyArterialRatelabel.push(keys[keydata]);
            this.hourlyArterialRatescore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

ArterialRatedeltascorebutton(){
  this.isSplitdateShownArterialRate = false;
  this.isdailyArterialRateshown = false;
  this.ishourlyArterialRateshown = false;
  this.isdeltaArterialRateshown = true;
  this.ArterialRatebuttonvalue = 'Delta';
  this.h5.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), sofaname: 'ArterialRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaArterialRatelabel = new Array();
          this.deltaArterialRatescore = new Array();
          for(let keydata in keys){
            this.deltaArterialRatelabel.push(keys[keydata]);
            this.deltaArterialRatescore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

ArterialRateclick(){
  this.isdropdownclickfive = !this.isdropdownclickfive;
  if(this.isdropdownclickfive){
    this.isgridfive = true;
    this.isgraphfive = false;
  }else{
    this.isgridfive = false;
    this.isgraphfive = false;
  }
  this.h5.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'ArterialRate' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourArterialRate = new Array();
          tempdata.forEach(data => {
            
            this.datelistArterialRate.push(data.READTIME);
            this.dailyhourArterialRate.push(data.SCORE);
            
          });
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}


WBCdataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Potassium',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.WBCValue = res.datavalue;
    this.WBCPoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickWBC(data){
  this.isSplitdateShownMeanArterialRate = true;
  
  this.h6.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'WBC'
                    } } 
        ).subscribe(res => {
          this.detailedWBC = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

WBCdailyscorebutton(){
  this.isSplitdateShownWBC = false;
  this.isdailyWBCshown = true;
  this.ishourlyWBCshown = false;
  this.isdeltaWBCshown = false;
  this.WBCbuttonvalue = 'Daily';
  this.h6.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'WBC' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourWBC = new Array();
          this.datelistWBC = new Array();
          tempdata.forEach(data => {
            
            this.datelistWBC.push(data.READTIME);
            this.dailyhourWBC.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

WBChourlycorebutton(){
  this.isSplitdateShownWBC = false;
  this.isdailyWBCshown = false;
  this.ishourlyWBCshown = true;
  this.isdeltaWBCshown = false;
  this.WBCbuttonvalue = 'Hourly';
  this.h6.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'WBC' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlyWBClabel = new Array();
          this.hourlyWBCscore = new Array();

          for(let keydata in keys){
            this.hourlyWBClabel.push(keys[keydata]);
            this.hourlyWBCscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

WBCdeltascorebutton(){
  this.isSplitdateShownWBC = false;
  this.isdailyWBCshown = false;
  this.ishourlyWBCshown = false;
  this.isdeltaWBCshown = true;
  this.WBCbuttonvalue = 'Delta';
  this.h6.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'WBC' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaWBClabel = new Array();
          this.deltaWBCscore = new Array();
          for(let keydata in keys){
            this.deltaWBClabel.push(keys[keydata]);
            this.deltaWBCscore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

WBCclick(){
  this.isdropdownclicksix = !this.isdropdownclicksix;
  if(this.isdropdownclicksix){
    this.isgridsix = true;
    this.isgraphsix = false;
  }else{
    this.isgridsix = false;
    this.isgridsix = false;
  }
  this.h6.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'WBC' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourWBC = new Array();
          tempdata.forEach(data => {
            
            this.datelistWBC.push(data.READTIME);
            this.dailyhourWBC.push(data.SCORE);
            
          });
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}


SeriumSodiumdataclick(){

  console.log('test test test');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.panelClass = 'my-dialog';
  dialogConfig.data = {
    datalabel : 'Serium Sodium',
    MRNO: this.MRNO,
      BEDNO: this.BEDNO,
      LOCATION: this.LOCATION,
      Updatevalues: this.responseData
  };
  let dialogref = this.dialog.open(AppacheeditmodeComponent, dialogConfig);
  dialogref.afterClosed().subscribe(res => {
    
    this.SeriumSodiumValue = res.datavalue;
    this.SeriumSodiumPoint = res.score;

    
    
    /* this.bottomLabel = res.data;
    this.needleValue = res.data; */
  });
}

dailyclickSeriumSodium(data){
  this.isSplitdateShownMeanArterialRate = true;
  
  this.h7.get(this.rootURL+ '/GetAppacheDetailedCombo', 
        {params : { MRNO : this.MRNO.toString(),  date:  data, Action: '1'
          , appachename : 'SeriumSodium'
                    } } 
        ).subscribe(res => {
          this.detailedSeriumSodium = JSON.parse(JSON.stringify(res));
          
        
        },
        (error:HttpErrorResponse) => {
            console.log(error.error);
        }); 
}

SeriumSodiumdailyscorebutton(){
  this.isSplitdateShownSeriumSodium = false;
  this.isdailySeriumSodiumshown = true;
  this.ishourlySeriumSodiumshown = false;
  this.isdeltaSeriumSodiumshown = false;
  this.SeriumSodiumbuttonvalue = 'Daily';
  this.h7.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'SeriumSodium' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourSeriumSodium = new Array();
          this.datelistSeriumSodium = new Array();
          tempdata.forEach(data => {
            
            this.datelistSeriumSodium.push(data.READTIME);
            this.dailyhourSeriumSodium.push(data.SCORE);
            
          });

          

        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
 
  
}

SeriumSodiumhourlycorebutton(){
  this.isSplitdateShownSeriumSodium = false;
  this.isdailySeriumSodiumshown = false;
  this.ishourlySeriumSodiumshown = true;
  this.isdeltaSeriumSodiumshown = false;
  this.SeriumSodiumbuttonvalue = 'Hourly';
  this.h7.get(this.rootURL+ '/GetappacheHourlyScore', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'SeriumSodium' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.hourlySeriumSodiumlabel = new Array();
          this.hourlySeriumSodiumscore = new Array();

          for(let keydata in keys){
            this.hourlySeriumSodiumlabel.push(keys[keydata]);
            this.hourlySeriumSodiumscore.push(tempdata[0][keys[keydata]]);
          }
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

SeriumSodiumdeltascorebutton(){
  this.isSplitdateShownSeriumSodium = false;
  this.isdailySeriumSodiumshown = false;
  this.ishourlySeriumSodiumshown = false;
  this.isdeltaSeriumSodiumshown = true;
  this.SeriumSodiumbuttonvalue = 'Delta';
  this.h7.get(this.rootURL+ '/GetSofaDelta', 
        {params : { MRNO : this.MRNO.toString(), appachename: 'SeriumSodium' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          let keys = Object.keys(tempdata[0]);
          
          this.deltaSeriumSodiumlabel = new Array();
          this.deltaSeriumSodiumscore = new Array();
          for(let keydata in keys){
            this.deltaSeriumSodiumlabel.push(keys[keydata]);
            this.deltaSeriumSodiumscore.push(tempdata[0][keys[keydata]]);
          }
          
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

SeriumSodiumclick(){
  this.isdropdownclickseven = !this.isdropdownclickseven;
  if(this.isdropdownclickseven){
    this.isgridseven = true;
    this.isgraphseven = false;
  }else{
    this.isgridseven = false;
    this.isgraphseven = false;
  }
  this.h7.get(this.rootURL+ '/GetAppacheTempDaywiseSplitScore', 
        {params : { MRNO : this.MRNO.toString(), appachename : 'SeriumSodium' } } 
        ).subscribe(res => {
          let tempdata = JSON.parse(JSON.stringify(res));
          
          this.dailyhourSeriumSodium = new Array();
          tempdata.forEach(data => {
            
            this.datelistSeriumSodium.push(data.READTIME);
            this.dailyhourSeriumSodium.push(data.SCORE);
            
          });
        },
        (error:HttpErrorResponse) => {
                  console.log(error.error);
        });
}

}
