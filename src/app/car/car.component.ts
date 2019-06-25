import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  name: string;
  make: string;
  model: string;
  year: number;
  miles: number;
  color: string;
  description: string;

  constructor(nam: string, mak: string, mod:string, yea: number, mile: number, col:string, desc:string) {
    this.name = nam;
    this.make = mak;
    this.model = mod;
    this.year = yea;
    this.miles = mile;
    this.color = col;
    this.description = desc;
   }

  ngOnInit() {
  }

}
