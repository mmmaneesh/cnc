import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService } from "../../services/data-service.service";
import { NgForm } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  responseData: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<EditproductComponent>, public service: DataServiceService,
    private toast: ToastrModule, private http: HttpClient) { }

  ngOnInit() {
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
      QuantityValue: 0
    }

    
  }

  onSubmit(form: NgForm){
    this.updateRecord(form);
  }

  updateRecord(formdata: NgForm){
    
    this.http.get(this.rootURL+ '/updateProduct', 
      {params : { Productid: formdata.value.Productid, Product : formdata.value.Product, Code: formdata.value.Code, Quantity: formdata.value.Quantity
        , Protein: formdata.value.Protein,
                  Calorie: formdata.value.Calorie, Carbohydrate: formdata.value.Carbohydrate, Fat: formdata.value.Fat
                  , Sodium : formdata.value.Sodium,
                  Calcium: 'none', Magnesium : 'none', Osmo : 'none', Phos: 'none', Pot: 'none'
                  } } 
      ).subscribe(res => {
        this.responseData = JSON.stringify(res);
        this.dialogRef.close();
        this.resetForm(formdata);
        alert("Product updated successfully");
        this.service.showProductlist();
      },
      (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
      });  
    
  }

}
