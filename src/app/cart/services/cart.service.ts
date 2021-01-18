import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Product[] = [];

  constructor() { }
}
