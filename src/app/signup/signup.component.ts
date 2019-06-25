import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  httpClient: HttpClient;
  router: Router;
  route: ActivatedRoute;

  constructor(r: Router,a: ActivatedRoute, h: HttpClient) {
    this.httpClient = h;
    this.router = r;
    this.route = a;
   }

  signUp(f: NgForm){
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/signu?username='+f.value.username + "&password=" + f.value.password).subscribe((res : any)=>{
        resolve(res);
      });
    }).then((value : boolean) => {
      console.log(value);
        this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
