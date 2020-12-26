import { Appacheentry } from './appacheentry.model';
import { Demographicsobj } from './../demographicsobj.model';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  calculatorProductlist: Product[];
  responseData: any;
  productList: Product[];
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";
  formData: Product;
  formDataDemographics : Demographicsobj;
  formAppache: Appacheentry;
  constructor(private http: HttpClient) {

   }

   insertProduct(formdata: Product){
       return this.http.get(this.rootURL+ '/insertProduct', 
      {params : { Product : formdata.Product, Code: formdata.Code, Quantity: formdata.Quantity, Protein: formdata.Protein,
                  Calorie: formdata.Calorie, Carbohydrate: formdata.Carbohydrate, Fat: formdata.Fat, Sodium : formdata.Sodium,
                  Calcium: 'none', Magnesium : 'none', Osmo : 'none', Phos: 'none', Pot: 'none'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.stringify(res);
        alert("Product added successfully");
      },
      err => {
        console.log(err);
      });  
    
      //return this.http.post(this.rootURL + '/postProductData', formdata);
      
     
   }

   showProductlist(){
    this.http.get(this.rootURL+ '/getProductList'
      ).subscribe(res =>{
        //var itemstest = JSON.stringify(res);
        this.productList = res as Product[];
      },
      err =>{
        console.log(err);
      }
    );
   }

   getProductlist(){
    this.http.get(this.rootURL+ '/getProductList'
      ).subscribe(res =>{
        //var itemstest = JSON.stringify(res);
        this.calculatorProductlist = res as Product[];
      },
      err =>{
        console.log(err);
      }
    );
   }



}
