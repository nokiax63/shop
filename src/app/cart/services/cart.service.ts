import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { ProductInCart } from '../models/productInCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart: Array<ProductInCart> = [];

  constructor() { }

  getProducts(): Array<ProductInCart> {
    return this.productsInCart;
  }

  addProduct(product: Product): void {
    const productInCart = this.productsInCart.find(x => x.product.id === product.id);    
    if (productInCart) {
      productInCart.quantity += 1;
    }
    else {
      this.productsInCart.push(new ProductInCart(product, 1));
    }
  }

  substractProductFromCart(productInCart: ProductInCart): void {    
    const index = this.productsInCart.indexOf(productInCart);
    const productFromCart = this.productsInCart[index];
    if (productFromCart.quantity === 1) {
      this.productsInCart.splice(index, 1);
    }
    else {
      productFromCart.quantity -= 1;
    }
  }

  removeProduct(productInCart: ProductInCart): void {
    const index = this.productsInCart.indexOf(productInCart);
    this.productsInCart.splice(index, 1);
  }


  getTotalAmount(): number {
    return this.productsInCart
      .map(x => x.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);
  }

  getTotalSum(): number {
    let sum = 0;
    this.productsInCart.forEach(x=> {
      sum += x.quantity * x.product.price;
      return x;
    })      
    return sum;
  }
}
