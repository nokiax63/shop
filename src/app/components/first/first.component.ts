import { Component, OnInit } from '@angular/core';
export enum Category {
  Motorcycle = 'Motorcycle',
  Car = 'Car',
  Bus = 'Bus'
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  // модификатор public не нужен
  public name = 'Audi Q5';
  public description = 'Audi car';
  public price = 10000;
  public isAvailable = true;
  public category: Category = Category.Car;
  releaseYears: number[] = [2009, 2015];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor() { }

  ngOnInit(): void {
  }

}
