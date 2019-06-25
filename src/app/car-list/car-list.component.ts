import { Component, OnInit } from '@angular/core';
import { CarComponent } from '../car/car.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditCarComponent } from '../edit-car/edit-car.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  httpClient: HttpClient;
  router: Router;
  auth: AuthService;
  cars= [];
  constructor(private client: HttpClient, route: Router, au: AuthService) 
  {
    this.auth = au;
    this.router = route;
    this.httpClient = client;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/cars').subscribe((res : any[])=>{
        resolve(res);
      });
    }).then((value : any[]) => {
      value.forEach(element => {
        this.cars.push(new CarComponent(element.name,element.make,element.model,element.year,element.miles,element.color,element.description));
      });
      
    });
    

  }

  editCar(car: any){
    if(this.auth.isLoggedIn){
      this.router.navigate(['/edit/'+car.name+'/'+car.make+"/"+car.model+"/"+car.color+"/"+car.year+"/"+car.miles+"/"+car.description]);
    }
    else{
      this.router.navigate(['/signin']);
    }
  }



  ngOnInit() {
  }

}
