import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  httpClient: HttpClient;
  router: Router;
  route: ActivatedRoute;
  auth: AuthService;

  constructor(r: Router,a: ActivatedRoute, h: HttpClient, au: AuthService) {
    this.httpClient = h;
    this.router = r;
    this.route = a;
    this.auth = au;
   }

  signIn(f: NgForm){
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/sign?username='+f.value.username + "&password=" + f.value.password).subscribe((res : any)=>{
        resolve(res);
      });
    }).then((value : boolean) => {
      console.log(value);
      if(value){
        this.auth.isLoggedIn = true;
        this.router.navigate(['/list']);

      }
      else{
        this.router.navigate(['/signup']);
      }
    });
  }

  ngOnInit() {
  }

}
