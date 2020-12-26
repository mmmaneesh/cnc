import { Product } from './../../services/product.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrModule } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatTableDataSource} from "@angular/material";
import { NgForm, NumberValueAccessor } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  responseData: any;
  items: any;
  listData: MatTableDataSource<any>;
  productList: Product[]= [];
  Productname: string;
  Code:string;
  Quantity:number = 0;
  Calorie: string;
  Protein:string;
  Carbohydrate:string;
  Productidvalue: number = 0;
  Fat:string;
  Productdata: Product = new Product();
  ProductdataFirstrow: Product = new Product();
  Productarray : Product[] = [];
  sumprotein: string = '0';
  sumcalorie:string = '0';
  sumcarbohydrate:string = '0';
  sumfat:string = '0';

  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<CalculatorComponent>, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
    this.service.getProductlist();
    
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onChange(e){
    this.Protein = '0';
    this.Calorie = '0';
    this.Carbohydrate = '0';
    this.Fat = '0';
    this.Quantity = 0;

    let value = e.target.value;
    var result = this.service.calculatorProductlist.filter(function(product) {
      return product.Productid == value;
    });
    
    this.ProductdataFirstrow = new Product();
    this.ProductdataFirstrow.Productid = result[0].Productid;
    this.ProductdataFirstrow.Product = result[0].Product;
    this.ProductdataFirstrow.Protein = result[0].Protein;
    this.ProductdataFirstrow.Code = result[0].Code;
    this.ProductdataFirstrow.Quantity = result[0].Quantity;
    this.ProductdataFirstrow.Calorie = result[0].Calorie;
    this.ProductdataFirstrow.Carbohydrate = result[0].Carbohydrate;
    this.ProductdataFirstrow.Fat = result[0].Fat;

    this.Productdata = new Product();
    this.Productdata.Productid = result[0].Productid;
    this.Productdata.Product = result[0].Product;
    this.Productdata.Protein = result[0].Protein;
    this.Productdata.Code = result[0].Code;
    this.Productdata.Quantity = result[0].Quantity;
    this.Productdata.Calorie = result[0].Calorie;
    this.Productdata.Carbohydrate = result[0].Carbohydrate;
    this.Productdata.Fat = result[0].Fat;
    
    
    this.Productidvalue = result[0].Productid;
    
    this.Protein = result[0].Protein;
    this.Carbohydrate = result[0].Carbohydrate;
    this.Fat = result[0].Fat;
    this.Calorie = result[0].Calorie;


    

  }

  onLeaveEvent(){
   
    this.Productdata.Protein = ((parseFloat(this.Productdata.Protein) *  this.Quantity) / parseFloat(this.Productdata.Quantity)).toString();
    this.Productdata.Calorie = ((parseFloat(this.Productdata.Calorie) *  this.Quantity) / parseFloat(this.Productdata.Quantity)).toString();
    this.Productdata.Carbohydrate = ((parseFloat(this.Productdata.Carbohydrate) *  this.Quantity)/ parseFloat(this.Productdata.Quantity)).toString();
    this.Productdata.Fat = ((parseFloat(this.Productdata.Fat) *  this.Quantity)/ parseFloat(this.Productdata.Quantity)).toString();

    /* var result = this.Productarray.filter(function(pru) {
     console.log('data');
     
      return pru.Productid == this.Productdata.Productid;
    }); */
    //alert(result);
    
    /* result[0].Protein = this.Productdata.Protein;
    result[0].Carbohydrate = this.Productdata.Carbohydrate;
    result[0].Calorie = this.Productdata.Calorie; 
    result[0].Fat = this.Productdata.Fat;
    result[0].Quantity = this.Productdata.Quantity.toString(); */

    const prodata : Product = new Product();
    prodata.Productid = this.Productdata.Productid;
    prodata.Product = this.Productdata.Product;
    prodata.Protein = this.Productdata.Protein;
    prodata.Code = this.Productdata.Code;
    prodata.Quantity = this.Quantity.toString();
    prodata.QuantityValue = parseInt(this.Productdata.Quantity);
    prodata.Calorie = this.Productdata.Calorie;
    prodata.Carbohydrate = this.Productdata.Carbohydrate;
    prodata.Fat = this.Productdata.Fat;
    this.Productarray.push(prodata);

    this.sumcalorie = '0';
    this.sumcarbohydrate = '0';
    this.sumfat = '0';
    this.sumprotein = '0';
    
    this.Productarray.forEach((value) => {
      this.sumcalorie = (parseFloat(this.sumcalorie) + parseFloat(value.Calorie)).toString();
      this.sumcarbohydrate = (parseFloat(this.sumcarbohydrate) + parseFloat(value.Carbohydrate)).toString();
      this.sumfat = (parseFloat(this.sumfat) + parseFloat(value.Fat)).toString();
      this.sumprotein = (parseFloat(this.sumprotein) + parseFloat(value.Protein)).toString();
    });


  }

  plusclicked(pro){
    let result = this.Productarray.filter(function(dt){
      return dt.Productid == pro.Productid;
    });

    var resulttemp = this.service.calculatorProductlist.filter(function(product) {
      return product.Productid == pro.Productid;
    });

    let currquantity = parseInt(result[0].Quantity);
    result[0].Calorie = ((parseFloat(resulttemp[0].Calorie) * (currquantity + 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Protein = ((parseFloat(resulttemp[0].Protein) * (currquantity + 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Carbohydrate = ((parseFloat(resulttemp[0].Carbohydrate) * (currquantity + 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Fat = ((parseFloat(resulttemp[0].Fat) * (currquantity + 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Quantity = (currquantity + 1).toString();

    this.sumcalorie = '0';
    this.sumcarbohydrate = '0';
    this.sumfat = '0';
    this.sumprotein = '0';
    
    this.Productarray.forEach((value) => {
      this.sumcalorie = (parseFloat(this.sumcalorie) + parseFloat(value.Calorie)).toString();
      this.sumcarbohydrate = (parseFloat(this.sumcarbohydrate) + parseFloat(value.Carbohydrate)).toString();
      this.sumfat = (parseFloat(this.sumfat) + parseFloat(value.Fat)).toString();
      this.sumprotein = (parseFloat(this.sumprotein) + parseFloat(value.Protein)).toString();
    });
  }
  minusclicked(pro){
    let result = this.Productarray.filter(function(dt){
      return dt.Productid == pro.Productid;
    });
    var resulttemp = this.service.calculatorProductlist.filter(function(product) {
      return product.Productid == pro.Productid;
    });

    let currquantity = parseInt(result[0].Quantity);
    result[0].Calorie = ((parseFloat(resulttemp[0].Calorie) * (currquantity - 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Protein = ((parseFloat(resulttemp[0].Protein) * (currquantity - 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Carbohydrate = ((parseFloat(resulttemp[0].Carbohydrate) * (currquantity - 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Fat = ((parseFloat(resulttemp[0].Fat) * (currquantity - 1)) / parseInt(resulttemp[0].Quantity)).toString();
    result[0].Quantity = (currquantity - 1).toString();

    this.sumcalorie = '0';
    this.sumcarbohydrate = '0';
    this.sumfat = '0';
    this.sumprotein = '0';
    
    this.Productarray.forEach((value) => {
      this.sumcalorie = (parseFloat(this.sumcalorie) + parseFloat(value.Calorie)).toString();
      this.sumcarbohydrate = (parseFloat(this.sumcarbohydrate) + parseFloat(value.Carbohydrate)).toString();
      this.sumfat = (parseFloat(this.sumfat) + parseFloat(value.Fat)).toString();
      this.sumprotein = (parseFloat(this.sumprotein) + parseFloat(value.Protein)).toString();
    });
  }

  crossclicked(pro){
    this.Productarray = this.Productarray.filter(function(dt){
      return dt.Productid != pro.Productid;
    });
    this.sumcalorie = '0';
    this.sumcarbohydrate = '0';
    this.sumfat = '0';
    this.sumprotein = '0';
    
    this.Productarray.forEach((value) => {
      this.sumcalorie = (parseFloat(this.sumcalorie) + parseFloat(value.Calorie)).toString();
      this.sumcarbohydrate = (parseFloat(this.sumcarbohydrate) + parseFloat(value.Carbohydrate)).toString();
      this.sumfat = (parseFloat(this.sumfat) + parseFloat(value.Fat)).toString();
      this.sumprotein = (parseFloat(this.sumprotein) + parseFloat(value.Protein)).toString();
    });
  }


}
