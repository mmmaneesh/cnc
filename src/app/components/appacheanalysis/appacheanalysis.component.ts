import { formatDate } from '@angular/common';
import { Component, OnInit, Directive, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-appacheanalysis',
  templateUrl: './appacheanalysis.component.html',
  styleUrls: ['./appacheanalysis.component.css']
})
export class AppacheanalysisComponent implements OnInit {

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

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
  

  constructor(private dialogRef : MatDialogRef<AppacheanalysisComponent>) { 
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

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  gridClick(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridone = true;
      this.isgraphone = false;
      this.isdropdownclickone = true;
    }else if(value == "graph"){
      this.isgridone = false;
      this.isgraphone = true;
      this.isdropdownclickone = true;
    }
  }
  gridClick2(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridtwo = true;
      this.isgraphtwo = false;
      this.isdropdownclicktwo = true;
    }else if(value == "graph"){
      this.isgridtwo = false;
      this.isgraphtwo = true;
      this.isdropdownclicktwo = true;
    }
  }
  gridClick3(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridthree = true;
      this.isgraphthree = false;
      this.isdropdownclickthree = true;
    }else if(value == "graph"){
      this.isgridthree = false;
      this.isgraphthree = true;
      this.isdropdownclickthree = true;
    }
  }
  gridClick4(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridfour = true;
      this.isgraphfour = false;
      this.isdropdownclickfour = true;
    }else if(value == "graph"){
      this.isgridfour = false;
      this.isgraphfour = true;
      this.isdropdownclickfour = true;
    }
  }
  gridClick5(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridfive = true;
      this.isgraphfive = false;
      this.isdropdownclickfive = true;
    }else if(value == "graph"){
      this.isgridfive = false;
      this.isgraphfive = true;
      this.isdropdownclickfive = true;
    }
  }
  gridClick6(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridsix = true;
      this.isgraphsix = false;
      this.isdropdownclicksix = true;
    }else if(value == "graph"){
      this.isgridsix = false;
      this.isgraphsix = true;
      this.isdropdownclicksix = true;
    }
  }
  
  gridClick7(e){
    let value = e.target.value;
    if(value == "grid"){
      this.isgridseven = true;
      this.isgraphseven = false;
      this.isdropdownclickseven = true;
    }else if(value == "graph"){
      this.isgridseven = false;
      this.isgraphseven = true;
      this.isdropdownclickseven = true;
    }
  }

  arterialclickone(){
    this.isdropdownclickone = !this.isdropdownclickone;
    if(this.isdropdownclickone){
      this.isgridone = true;
      this.isgraphone = false;
    }else{
      this.isgridone = false;
      this.isgraphone = false;
    }
  }
  arterialclicktwo(){
    this.isdropdownclicktwo = !this.isdropdownclicktwo;
    if(this.isdropdownclicktwo){
      this.isgridtwo = true;
      this.isgraphtwo = false;
    }else{
      this.isgridtwo = false;
      this.isgraphtwo = false;
    }
  }
  arterialclickthree(){
    this.isdropdownclickthree = !this.isdropdownclickthree;
    if(this.isdropdownclickthree){
      this.isgridthree = true;
      this.isgraphthree = false;
    }else{
      this.isgridthree = false;
      this.isgraphthree = false;
    }
  }
  arterialclickfour(){
    this.isdropdownclickfour = !this.isdropdownclickfour;
    if(this.isdropdownclickfour){
      this.isgridfour = true;
      this.isgraphfour = false;
    }else{
      this.isgridfour = false;
      this.isgraphfour = false;
    }
  }
  arterialclickfive(){
    this.isdropdownclickfive = !this.isdropdownclickfive;
    if(this.isdropdownclickfive){
      this.isgridfive = true;
      this.isgraphfive = false;
    }else{
      this.isgridfive = false;
      this.isgraphfive = false;
    }
  }
  arterialclicksix(){
    this.isdropdownclicksix = !this.isdropdownclicksix;
    if(this.isdropdownclicksix){
      this.isgridsix = true;
      this.isgraphsix = false;
    }else{
      this.isgridsix = false;
      this.isgraphsix = false;
    }
  }
  arterialclickseven(){
    this.isdropdownclickseven = !this.isdropdownclickseven;
    if(this.isdropdownclickseven){
      this.isgridseven = true;
      this.isgraphseven = false;
    }else{
      this.isgridseven = false;
      this.isgraphseven = false;
    }
  }


}
