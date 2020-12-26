import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService } from "../../services/data-service.service";
import { NgForm } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  
  responseData: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";
  constructor(private dialogRef : MatDialogRef<AddproductComponent>, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient) { }

  ngOnInit() {
    this.resetForm();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  resetForm(form?: NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData = {
      Productid : 0,
      Calcium : '',
      Carbohydrate : '',
      Code : '',
      Fat : '',
      Magnesium : '',
      OsmolalityOfFeed : '',
      Phosphorus : '',
      Potassium : '',
      Product : '',
      Protein : '',
      Quantity : '',
      Sodium : '',
      Calorie : '',
      TypeProduct: '',
      QuantityValue : 0
    }
  }

  onSubmit(form: NgForm){
    this.insertRecord(form);
  }

  insertRecord(formdata: NgForm){
    
    this.http.get(this.rootURL+ '/insertProduct', 
      {params : { Product : formdata.value.Product, Code: formdata.value.Code, Quantity: formdata.value.Quantity
        , Protein: formdata.value.Protein,
                  Calorie: formdata.value.Calorie, Carbohydrate: formdata.value.Carbohydrate, Fat: formdata.value.Fat
                  , Sodium : formdata.value.Sodium,
                  Calcium: 'none', Magnesium : 'none', Osmo : 'none', Phos: 'none', Pot: 'none'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.stringify(res);
        this.dialogRef.close();
        this.resetForm(formdata);
        alert("Product added successfully");
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      });  
    
  }

}
