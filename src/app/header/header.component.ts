import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  httpClient: HttpClient;
  router: Router;
  route: ActivatedRoute;
  auth: AuthService;

  constructor(r: Router,a: ActivatedRoute, h: HttpClient, aut: AuthService) {
    this.httpClient = h;
    this.router = r;
    this.route = a;
    this.auth = aut;
   }
  canAdd(){
    if(this.auth.isLoggedIn){
      this.router.navigate(['/add']);
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

  ngOnInit() {

  }

}
