import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Product } from 'src/app/services/product.model';

@Component({
  selector: 'app-productcombination',
  templateUrl: './productcombination.component.html',
  styleUrls: ['./productcombination.component.css']
})
export class ProductcombinationComponent implements OnInit {

  //apiUrl: string = 'http://34.69.0.4/product';
  apiUrl: string = 'http://hospital.dexteradomini.in/api/DataApi/getProductComb';
  showSpinner = false;
  
  MinProtein: number = 60;
  MinCalorie: number = 1670;
  FeedVolume: number = 1000;
  IncrProtein: number = 45;
  IncrCalorie: number = 400;
  items: any;
  productfirst : string;
  productsecond  : string;
  productthird : string;
  productfourth : string;
  productfifth : string;
  productsixth : string;
  productseventh : string;
  producteighth : string;
  productninth : string;
  totalproteinfirst : string;
  totalproteinsecond : string;
  totalproteinthird : string;
  totalcaloriefirst : string;
  totalcaloriesecond : string;
  totalcaloriethird : string;

  

  constructor(private dialogRef : MatDialogRef<ProductcombinationComponent>, private http: HttpClient,
    private http2: HttpClient) {

      this.showSpinner = true;
     this.http.get(this.apiUrl, {params : { feedvolume : this.FeedVolume.toString(), protein : this.MinProtein.toString(),
      calorie : this.MinCalorie.toString(), proteindiff : this.IncrProtein.toString(), caloriediff: this.IncrCalorie.toString()
    
    } }).subscribe(
      res => {
       
         var itemstest = JSON.stringify(res);
        
        this.items = JSON.parse(itemstest);
        this.items = JSON.parse(this.items);
         
        
        let loopvalue : number = 1;
        let initialvalue : number = 1;

        
          for(let key in this.items){
            
              
              let result : string = '';

              if(initialvalue == 1){
                for(let value in this.items[key]){
                  
                  if(loopvalue == 1){
                    this.productfirst = this.items[key][value] ;
                  }else if(loopvalue == 2){
                    this.productsecond = this.items[key][value] ;
                  }else if(loopvalue == 3){
                    this.productthird = this.items[key][value] ;
                  }else if(loopvalue == 4){
                    this.totalproteinfirst = this.items[key][value] ;
                  }else if(loopvalue == 5){
                    this.totalcaloriefirst = this.items[key][value] ;
                  }
                  
                  loopvalue = loopvalue + 1;
                }
                
              }else if(initialvalue == 2){
                for(let value in this.items[key]){
                  if(loopvalue == 6){
                    this.productfourth = this.items[key][value] ;
                  }else if(loopvalue == 7){
                    this.productfifth = this.items[key][value] ;
                  }else if(loopvalue == 8){
                    this.productsixth = this.items[key][value] ;
                  }else if(loopvalue == 9){
                    this.totalproteinsecond = this.items[key][value] ;
                  }else if(loopvalue == 10){
                    this.totalcaloriesecond = this.items[key][value] ;
                  }
                  
                  loopvalue = loopvalue + 1;
                }
              }else if(initialvalue == 3){
                for(let value in this.items[key]){
                  if(loopvalue == 11){
                    this.productseventh = this.items[key][value] ;
                  }else if(loopvalue == 12){
                    this.producteighth = this.items[key][value] ;
                  }else if(loopvalue == 13){
                    this.productninth = this.items[key][value] ;
                  }else if(loopvalue == 14){
                    this.totalproteinthird = this.items[key][value] ;
                  }else if(loopvalue == 15){
                    this.totalcaloriethird = this.items[key][value] ;
                  }
                  
                  loopvalue = loopvalue + 1;
                }
              }
              initialvalue = initialvalue + 1;
            }
        
            this.showSpinner = false;
      },
      err => {
        console.log(err);
      }
    );   

    /* this.apiUrl = this.apiUrl + "product" + "/feedvolume/" + this.FeedVolume.toString() + "/protein/" + this.MinProtein.toString() + 
    "/calorie/" + this.MinCalorie.toString() + "/proteindiff/" + this.IncrProtein.toString() + "/caloriediff/" + this.IncrCalorie.toString();
      */
    /* this.http.get(this.apiUrl, {params : { } }).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        this.items = JSON.parse(itemstest);
        console.log(this.items)
        for(let key in this.items){
          if(key == '0' || key == '1' || key == '2'){
            
            let result : string = '';
            let loopvalue : number = 1;
            for(let value in this.items[key]){
              console.log(value);
              console.log('next');
              result = result + loopvalue.toString() + '. ' + this.items[key][value] + '\n';
              loopvalue = loopvalue + 1;
            }
            if(key == '0'){
              this.productfirst = result;
            }else if(key == '1'){
              this.productsecond = result;
            }else if(key == '2'){
              this.productthird = result;
            }
          }
        }
        
      },
      err => {
        console.log(err);
      }
    );  */ 
   }

  ngOnInit() {
  }

  onNoClick(){

    
    this.dialogRef.close();
  }

  FirstProductClick(){

    this.dialogRef.close({firstproduct: this.productfirst, secondproduct: this.productsecond,
    thirdproduct: this.productthird, totalprotein: this.totalproteinfirst, totalcalorie: this.totalcaloriefirst});
  }

  SecondProductClick(){
    this.dialogRef.close({firstproduct: this.productfourth, secondproduct: this.productfifth,
      thirdproduct: this.productsixth, totalprotein: this.totalproteinsecond, totalcalorie: this.totalcaloriesecond});
  }

  ThirdProductClick(){
    this.dialogRef.close({firstproduct: this.productseventh, secondproduct: this.producteighth,
      thirdproduct: this.productninth, totalprotein: this.totalproteinthird, totalcalorie: this.totalcaloriethird});
  }

}
