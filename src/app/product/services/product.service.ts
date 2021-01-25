import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductColor } from '../../product/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Array<Product> {
    return [
      new Product(1, 'Xiaomi 8', 'Xiaomi is chinese phone', 6200, true, ProductCategory.Phone, [ProductColor.Black, ProductColor.White]),
      new Product(2, 'Iphone 11', 'Iphone is a shit', 28000, false, ProductCategory.Phone, [ProductColor.Red, ProductColor.White]),
      new Product(3, 'Asus Vivobook', 'Good laptop', 21000, true, ProductCategory.Notebook, [ProductColor.Black, ProductColor.White])
    ];
  }
}
