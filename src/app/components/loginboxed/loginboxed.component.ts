import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loginboxed',
  templateUrl: './loginboxed.component.html',
  styleUrls: ['./loginboxed.component.css']
})
export class LoginboxedComponent implements OnInit {

  valueclicked : string = '';
  Username:string = "";
  Password:string = "";
  id : number = 0;

  constructor(private router: Router,private activatedRoute : ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'];
      
    
      
      });
  }

  ngOnInit() {
  }

  ProviderTemplate(){
    this.valueclicked = 'provider';
  }

  DietaryTemplate(){
    this.valueclicked = 'dietary';
  }

  loginClick(){
      
    if(this.Username == "useradmin" && this.Password == "useradmin@123" && this.id == 1){
      this.router.navigateByUrl('/home');
    }else if(this.Username == "useradmin" && this.Password == "useradmin@123" && this.id == 2){
      this.router.navigateByUrl('/dietary');
    }else if(this.Username == "useradmin" && this.Password == "useradmin@123" && this.id == 3){
      this.router.navigateByUrl('/nurses');
    }

  }



}
