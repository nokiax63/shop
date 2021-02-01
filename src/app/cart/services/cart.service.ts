import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { ProductInCart } from '../models/productInCart';

@Injectable()
export class CartService {

  totalSum = 0;
  totalQuantity = 0;
  private cartProducts: Array<ProductInCart> = [];

  constructor() { }

  getProducts(): Array<ProductInCart> {
    return this.cartProducts;
  }

  addProduct(product: Product): void {
    const productInCart = this.cartProducts.find(x => x.product.id === product.id);
    if (productInCart) {
      productInCart.quantity += 1;
    }
    else {
      this.cartProducts.push(new ProductInCart(product, 1));
    }
    this.updateCartData();
  }

  substractProductFromCart(productInCart: ProductInCart): void {
    const index = this.cartProducts.indexOf(productInCart);
    const productFromCart = this.cartProducts[index];
    if (productFromCart.quantity === 1) {
      this.cartProducts.splice(index, 1);
    }
    else {
      productFromCart.quantity -= 1;
    }
    this.updateCartData();
  }

  removeAllProducts(): Array<ProductInCart> {
    this.cartProducts = [];
    this.updateCartData();
    return this.cartProducts;
  }

  removeProduct(productInCart: ProductInCart): void {
    const index = this.cartProducts.indexOf(productInCart);
    this.cartProducts.splice(index, 1);
    this.updateCartData();
  }

  isEmptyCart(): boolean {
    return this.cartProducts.length === 0;
  }

  private updateCartData(): void {
    this.setTotalQuantity();
    this.setTotalSum();
  }

  private setTotalQuantity(): void {
    this.totalQuantity =  this.cartProducts
      .map(x => x.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);
  }

  private setTotalSum(): void {
    let sum = 0;
    this.cartProducts.forEach(x => {
      sum += x.quantity * x.product.price;
      return x;
    });
    this.totalSum = sum;
  }
}
