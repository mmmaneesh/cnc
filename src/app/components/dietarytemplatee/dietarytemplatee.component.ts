import { CartService } from './../../services/cart.service';
import { PrescriptionComponent } from './../prescription/prescription.component';
import { ProductselectionComponent } from './../productselection/productselection.component';
import { ProductcombinationComponent } from './../productcombination/productcombination.component';
import { Component, OnInit, Directive, Input, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonModule, formatDate } from '@angular/common'; 
import {trigger, state, style, transition, animate } from "@angular/animations";
import { GaugeChartModule } from 'angular-gauge-chart';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../services/product.model';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrModule } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatTableDataSource} from "@angular/material";
import { QrcodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-dietarytemplatee',
  templateUrl: './dietarytemplatee.component.html',
  styleUrls: ['./dietarytemplatee.component.css']
})
export class DietarytemplateeComponent implements OnInit {
  apiUrl: string = 'http://hospital.dexteradomini.in/api/DataApi/GetMRNNo';
  apiUrlData: string = 'http://hospital.dexteradomini.in/api/DataApi/GetMRNNoData';
  items: any;
  data: any;
  responseData: any;
  noticationCount: number = 0;

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
  entrydate:string = '';
  doah:string = '';
  doaicu:string = '';

  BedNo : string = '';
  MRNO : string = '';
  FirstName : string = '';
  // Entrydate : string = '';
  Age: string = '';
  Gender: string = '';
  /* DOAH: string = '';
  DOAICU : string = ''; */
  Diagnosis : string = '';
  Location: string = '';
  ICUDAY : string = '';
  showSpinner = false;
  productfirst : string = '';
  productsecond  : string = '';
  productthird : string = '';
  totalproteinfirst : string = '';
  
  totalcaloriefirst : string = '';

  cartitems: any;
  


  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";
  


  constructor(private dialog: MatDialog, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient, private cart : CartService) { }

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        this.items = JSON.parse(itemstest);
        console.log(this.items);

      },
      err => {
        console.log(err);
      }
    ); 

    this.service.getProductlist();
  }

  onChange(e){
    let value = e.target.value;
    console.log(value);
    this.http.get(this.apiUrlData, {params : { MRNO : value.toString()} }).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        this.data = JSON.parse(itemstest);
        this.entrydate = formatDate(this.data.ENTRY_DATE, 'yyyy-MM-dd', 'en-US');
        this.doah = formatDate(this.data.DOAH, 'yyyy-MM-dd', 'en-US');
        this.doaicu = formatDate(this.data.DOAICU, 'yyyy-MM-dd', 'en-US');

        this.BedNo = this.data.BED_NO;
        this.MRNO = this.data.MRNO;
        this.FirstName = this.data.FIRSTNAME;
        this.Age = this.data.AGE;
        this.Gender = this.data.GENDER;
        
        this.Diagnosis = this.data.DIAGNOSIS;
        this.Location = this.data.LOCATION;
        
        this.ICUDAY = this.data.ICUDAY;
        this.showSpinner = false;
      },
      err => {
        console.log(err);
      }
    ); 
   }



   

   onAutoSuggested(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    
    dialogConfig.panelClass = 'my-dialog';
    let dialogref = this.dialog.open(ProductcombinationComponent, dialogConfig);

    
    dialogref.afterClosed().subscribe(res => {
      console.log('after closes product combination');
      console.log(res); 
      console.log(res.firstproduct); 
      
      this.productfirst = res.firstproduct;
      console.log(this.productfirst);
      this.productsecond = res.secondproduct;
      this.productthird = res.thirdproduct;
      this.totalproteinfirst = res.totalprotein;
      this.totalcaloriefirst = res.totalcalorie;

      
      
      this.Protein = '0';
      this.Calorie = '0';
      this.Carbohydrate = '0';
      this.Fat = '0';
      this.Quantity = 0;

      
      let quantityfirst = this.productfirst.split('-')[1];
      let quantitysecond = this.productsecond.split('-')[1];
      let quantitythird = this.productthird.split('-')[1];
      let productcodefirst= this.productfirst.split('-')[0].toString();
      let productcodesecond= this.productsecond.split('-')[0].toString();
      let productcodethird= this.productthird.split('-')[0].toString();

      console.log(quantityfirst);

      var result1 = this.service.calculatorProductlist.filter(function(product) {
        return product.Code == productcodefirst;
      });

      var result2 = this.service.calculatorProductlist.filter(function(product) {
        return product.Code == productcodesecond;
      });

      var result3 = this.service.calculatorProductlist.filter(function(product) {
        return product.Code == productcodethird;
      });

      
      const prodata : Product = new Product();
      prodata.Productid = result1[0].Productid;
      prodata.Product = result1[0].Product;
      prodata.Protein = result1[0].Protein;
      prodata.Code = result1[0].Code;
      prodata.Quantity = quantityfirst;
      prodata.Calorie = result1[0].Calorie;
      prodata.Carbohydrate = result1[0].Carbohydrate;
      prodata.Fat = result1[0].Fat;

      this.Productarray.push(prodata);

      const prodata1 : Product = new Product();
      prodata1.Productid = result2[0].Productid;
      prodata1.Product = result2[0].Product;
      prodata1.Protein = result2[0].Protein;
      prodata1.Code = result2[0].Code;
      prodata1.Quantity = quantitysecond;
      prodata1.Calorie = result2[0].Calorie;
      prodata1.Carbohydrate = result2[0].Carbohydrate;
      prodata1.Fat = result2[0].Fat;

      this.Productarray.push(prodata1);

      const prodata2 : Product = new Product();
      prodata2.Productid = result3[0].Productid;
      prodata2.Product = result3[0].Product;
      prodata2.Protein = result3[0].Protein;
      prodata2.Code = result3[0].Code;
      prodata2.Quantity = quantitythird;
      prodata2.Calorie = result3[0].Calorie;
      prodata2.Carbohydrate = result3[0].Carbohydrate;
      prodata2.Fat = result3[0].Fat;

      this.Productarray.push(prodata2);

      console.log('data product');
      console.log(this.Productarray);


      this.sumcalorie = this.totalcaloriefirst.replace("[","").replace("]", "");
      this.sumcarbohydrate = '0';
      this.sumfat = '0';
      this.sumprotein = this.totalproteinfirst.replace("[","").replace("]", "");

    });

  }

  openCartDialog(datatemp){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    
    
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
      qrvalue: datatemp
    };
    let dialogref = this.dialog.open(QrcodeComponent, dialogConfig);
    /* dialogref.afterClosed().subscribe(res => {
      
      this.AppacheScoredata = res.data;
      this.calculateAppacheSpeedometer(this.AppacheScoredata);
      
      
    });  */
  }

  AddtoCart(){
    let carddata : string = '';
    this.Productarray.forEach(innerdata => {
      carddata = carddata + '\n' + innerdata.Code + '-' + innerdata.Quantity;
    });

    carddata = carddata + '\n' + 'Total Protein : ' + this.sumprotein + 'ml';
    carddata = carddata + '\n' + 'Total Calorie : ' + this.sumcalorie + 'ml';

    this.cart.addToCart(carddata);
    this.cartitems = this.cart.getItems();

    this.noticationCount = this.cart.getitemsCount();

    /* console.log('cart data');
    console.log(this.cartitems); */
  }

  onPrescriptionClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(PrescriptionComponent, dialogConfig);
  }

  onChangeProduct(e){
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
