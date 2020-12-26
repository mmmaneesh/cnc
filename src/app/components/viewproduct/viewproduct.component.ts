import { Product } from './../../services/product.model';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  listData: MatTableDataSource<any>;
  productList: Product[];
  responseData: any;
  readonly rootURL = "http://hospital.dexteradomini.in/api/DataApi";

  constructor(private dialogRef : MatDialogRef<ViewproductComponent>, public service: DataServiceService, private dialog: MatDialog,
    private toast: ToastrModule, private http: HttpClient) { }

  ngOnInit() {
    this.service.showProductlist();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  edit(Productid){
    var productFiltered = this.service.productList.filter(function(data){
      return data.Productid == Productid;
    });
    this.service.formData = productFiltered[0];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'my-dialog';
    this.dialog.open(EditproductComponent, dialogConfig);


  }

  delete(Productid){
    if(confirm("Do you want to delete this product?")){
      this.http.get(this.rootURL+ '/deleteProduct', 
      {params : { Productid: Productid} } 
      ).subscribe(res => {
        this.responseData = JSON.stringify(res);
       
        
        alert("Product Deleted successfully");
        this.service.showProductlist();
      },
      err => {
        console.log(err);
      });  
    }

    
  }

 

}
