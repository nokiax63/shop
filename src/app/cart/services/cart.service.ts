import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductColor } from 'src/app/product/models/product';
import { ProductInCart } from '../models/product-in-cart';


@Injectable()
export class CartService {

  totalSum = 0;
  totalQuantity = 0;
  private cartProducts: Array<ProductInCart> = [];

  constructor() {
  }

  setProductsFromStorage(): void {
    this.cartProducts = this.getProductsFromStorage();
    this.updateCartData();
  }

  getProducts(): Array<ProductInCart> {
    return this.cartProducts;
  }

  addProduct(product: Product, selectedColor: string): void {
    debugger
    const productsInCart = this.getProductsFromStorage();
    const productInCart = productsInCart.find(x => x.productId === product.id && x.color.toString() === selectedColor);
    if (productInCart) {
      productInCart.quantity += 1;
    }
    else {
      const newProductInCart = new ProductInCart(this.cartProducts.length + 1,
        product.id,
        product.name,
        product.description,
        product.price,
        product.isAvailable,
        product.category,
        selectedColor as ProductColor,
        1);
      productsInCart.push(newProductInCart);
    }
    this.setProductsInStorage(productsInCart);
  }

  increaseProductQuantity(productInCart: ProductInCart): void {
    productInCart.quantity += 1;
    this.setProductsInStorage(this.cartProducts);
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
    this.setProductsInStorage(this.cartProducts);
    this.updateCartData();
  }

  removeAllProducts(): Array<ProductInCart> {
    this.cartProducts = [];
    this.setProductsInStorage([]);
    this.updateCartData();
    return this.cartProducts;
  }

  removeProduct(productInCart: ProductInCart): void {
    const index = this.cartProducts.indexOf(productInCart);
    this.cartProducts.splice(index, 1);
    this.setProductsInStorage(this.cartProducts);
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
    this.totalQuantity = this.getProductsFromStorage()
      .map(x => x.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);
  }

  private setTotalSum(): void {
    let sum = 0;
    this.getProductsFromStorage().forEach(x => {
      sum += x.quantity * x.price;
      return x;
    });
    this.totalSum = sum;
  }

  private getProductsFromStorage(): Array<ProductInCart> {
    const productsFromStorage = localStorage.getItem('productsInCart');
    if (productsFromStorage) {
      return JSON.parse(productsFromStorage) as Array<ProductInCart>;
    }
    return [];
  }

  private setProductsInStorage(productsInCart: Array<ProductInCart>): void {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }
}
