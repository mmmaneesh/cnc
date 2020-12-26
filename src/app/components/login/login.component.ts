import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  Username:string = "";
  Password:string = "";
  id : number = 0;
  @ViewChild('templatevalue', {static: false}) input:ElementRef; 
  //@ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;
  constructor(private router: Router,private activatedRoute : ActivatedRoute ) {
    
   }

  ngOnInit() {
    //this.videoplayer.nativeElement.play();
  }



  loginClick(){
    
    console.log(this.input.nativeElement.value) ;   
    if(this.Username == "useradmin" && this.Password == "useradmin@123" && this.input.nativeElement.value == "Doctortemplate"){
      this.router.navigateByUrl('/home');
    }else if(this.Username == "useradmin" && this.Password == "useradmin@123" && this.input.nativeElement.value == "Dietarytemplate"){
      this.router.navigateByUrl('/dietary');
    }else if(this.Username == "useradmin" && this.Password == "useradmin@123" && this.input.nativeElement.value == "Nursestemplate"){
      this.router.navigateByUrl('/home');
    }
    /* if(this.Username == "admin" && this.Password == "admin@123"){
      this.router.navigateByUrl('/home');
    } */

  }

}
