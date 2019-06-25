import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import {Router} from "@angular/router"


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  httpClient: HttpClient;
  carTypes = [];
  carMakes = [];
  carModels = [];
  colors = [];
  router: Router;
  submitCar(f: NgForm){
    console.log(f.value);
    var body = "?name=" + f.value.name + "&make=" + f.value.make + "&model=" + f.value.model + "&color=" + f.value.color + "&year=" + f.value.year + "&miles=" + f.value.miles + "&description="+f.value.description;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/pushCar' + body).subscribe((res : any[])=>{
        resolve(res);
      });
    }).then((value : any) => {
        this.router.navigate(['/list']);
      });
  }

  constructor(private client: HttpClient,private route: Router) 
  {
    this.router = route;
    this.httpClient = client;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/getCarTypes').subscribe((res : any[])=>{
        resolve(res);
      });
    }).then((value : any[]) => {
      value.forEach(element => {
        this.carTypes.push(element);
        if(this.carMakes.indexOf(element.make) == -1){
          this.carMakes.push(element.make);
        }
      });
      
    });

    const promise2 = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/getColors').subscribe((res : any[])=>{
        resolve(res);
      });
    }).then((value : any[]) => {
      value.forEach(element => {
        this.colors.push(element.color);
      });
      
    });
    

  }

  firstDropDownChanged(value: any){
    this.carModels = [];
    this.carTypes.forEach(type => {
      if(type.make == value){
        this.carModels.push(type.model);
      }
    });

  }

  ngOnInit() {
  }

}
