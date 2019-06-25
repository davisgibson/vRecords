import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { type } from 'os';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  httpClient: HttpClient;
  router: Router;
  car: any;
  carTypes= [];
  carMakes= [];
  carModels=[];
  colors= [];
  name: string;
  make: string;
  model: string;
  color: string;
  year: number;
  miles: number;
  description: string;
  carLoaded= false;
  promise: Promise<boolean>;
  promise2: Promise<boolean>;

  constructor(private route: Router,private rout: ActivatedRoute,private client: HttpClient) {
    this.router= route;
    this.httpClient = client;
    this.rout.params.subscribe( params => {
      this.name=params.name; 
      this.make = params.make;
      this.model = params.model;
      this.color = params.color;
      this.year = params.year;
      this.miles = params.miles;
      this.description = params.description;
    });
    this.promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/car?name='+ this.name).subscribe((res : any)=>{
        resolve(res[0]);
      });
    }).then((value : any) => {
      this.car = value;
      this.carLoaded=true;
      return true;
    });

    this.promise2 = new Promise((resolve, reject) => {
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
      this.firstDropDownChanged(this.car.make);
      return true;
    });


    const promise3 = new Promise((resolve, reject) => {
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

  deleteCar(){
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/deleteCar?name='+this.name).subscribe((res : any[])=>{
        resolve(res);
      });
    }).then((value : any) => {
        this.route.navigate(['/list']);
      });
  }

  editCar(f: NgForm){
    console.log(f.value);
    var body = "?name=" + f.value.name + "&make=" + f.value.make + "&model=" + f.value.model + "&color=" + f.value.color + "&year=" + f.value.year + "&miles=" + f.value.miles + "&description="+f.value.description;
    console.log(body);
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/editCar' + body).subscribe((res : any[])=>{
        resolve(res);
      });
    }).then((value : any) => {
        this.route.navigate(['/list']);
      });
  }

  ngOnInit() {
  }

}
