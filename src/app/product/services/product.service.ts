import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductColor } from '../../product/models/product';


const products = [
  new Product(1, 'Xiaomi 8', 'Xiaomi is chinese phone', 6200, true, ProductCategory.Phone, [ProductColor.Black, ProductColor.White]),
  new Product(2, 'Iphone 11', 'Iphone is apple phone', 28000, false, ProductCategory.Phone, [ProductColor.Red, ProductColor.White]),
  new Product(3, 'Asus Vivobook', 'Good laptop', 21000, true, ProductCategory.Notebook, [ProductColor.Black, ProductColor.White])
];
const productListPromise = Promise.resolve(products);

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Promise<Product[]> {
    return productListPromise;
  }

  getProduct(id: number | string| null): Promise<Product| undefined> {
    return this.getProducts()
      .then(x => x.find(p => p.id === id))
      .catch(() => Promise.reject('Error in getProduct method'));
  }

  createProduct(task: Product): void {
    products.push(task);
  }

  updateProduct(task: Product): void {
    const i = products.findIndex(x => x.id === task.id);

    if (i > -1) {
      products.splice(i, 1, task);
    }
  }

  deleteProduct(task: Product): void {
    const i = products.findIndex(p => p.id === task.id);

    if (i > -1) {
      products.splice(i, 1);
    }
  }
}
