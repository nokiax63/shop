import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductColor } from '../../product/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    {
      category: ProductCategory.Phone,
      name: 'Xiaomi 8',
      color: [ ProductColor.Black, ProductColor.White],
      price: 6200,
      isAvailable: true,
      description: 'Xiaomi is chinese phone'
    },
    {
      category: ProductCategory.Phone,
      name: 'Iphone 11',
      color: [ ProductColor.Red, ProductColor.White],
      price: 28000,
      isAvailable: true,
      description: 'Iphone is a shit'
    },
    {
      category: ProductCategory.Notebook,
      name: 'Asus Vivobook',
      color: [ ProductColor.Black, ProductColor.White],
      price: 21000,
      isAvailable: false,
      description: 'Good laptop'
    }];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }
}
