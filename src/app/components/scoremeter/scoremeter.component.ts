import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoremeter',
  templateUrl: './scoremeter.component.html',
  styleUrls: ['./scoremeter.component.css']
})
export class ScoremeterComponent implements OnInit {

  @Input('totalScore') totalReading;
  @Input('acquiredScore') reading;
  //reading = 50;
  needleMove = 45;
  calcDeg = 91;
  switchColor = '#191e3a';
  switchRiskColor = '#A2ECFB';
  percentage = 0;
  shadowAlert = '';
  //totalReading = 100;
  processReading = 0;
  constructor() { }

  ngOnInit() {    
    console.log(this.reading);
    setTimeout(() => {
      if (parseInt(this.reading) >= parseInt(this.totalReading)) {
        this.reading = this.totalReading;
      }
      this.processReading = Math.round((this.reading / this.totalReading) * 75);
      console.log(this.reading , this.totalReading, this.processReading);
      this.runMeter();
    },1000);        
  }
  runMeter() {
    let prLoader = 0;
    let startInterval = setInterval(() => {
      if (prLoader > 75) {
        prLoader = 75;
      }
      if (prLoader < this.processReading) {
        prLoader++;
        this.percentage = Math.floor((prLoader/75)*100);
        const deg = Math.round(prLoader*3.6);
        if (deg <= 180){
          this.calcDeg = 90+deg;
          this.switchColor = '#191e3a';
        } else {
          this.switchColor = '#A2ECFB';
          console.log('negative');
          this.calcDeg = deg-90;  
           
          if (this.percentage > 50) {
            this.switchColor = 'red';
          } else if (this.percentage > 40) {
          //  this.switchColor = 'orange';
          }        
        }  
        
        if (this.percentage > 50) {          
          this.switchRiskColor = 'red';
          this.shadowAlert = 'pulse';
        } else if (this.percentage > 40) {          
         // this.switchRiskColor = 'orange';
        }
         
        this.needleMove = 45+deg;
      } else {
        this.percentage = this.reading;
        clearInterval(startInterval);
      }
      //this.needleMove++;
      },25);
  }

}
