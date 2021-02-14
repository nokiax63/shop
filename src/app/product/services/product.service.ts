import { Injectable } from '@angular/core';
import { observable, Observable, Subscriber } from 'rxjs';
import { Product, ProductCategory, ProductColor } from '../../product/models/product';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Observable<Array<Product>> {
    const products = [
      new Product(1, 'Xiaomi 8', 'Xiaomi is chinese phone', 6200, true, ProductCategory.Phone, [ProductColor.Black, ProductColor.White]),
      new Product(2, 'Iphone 11', 'Iphone is apple phone', 28000, false, ProductCategory.Phone, [ProductColor.Red, ProductColor.White]),
      new Product(3, 'Asus Vivobook', 'Good laptop', 21000, true, ProductCategory.Notebook, [ProductColor.Black, ProductColor.White])
    ];

    // или of(products);
    return new Observable<Array<Product>>((obs: Subscriber<any>) => {
      obs.next(products);
    });
  }
}
