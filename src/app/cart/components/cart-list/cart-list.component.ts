import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { ProductInCart } from '../../models/product-in-cart';
import { Order, ProductInOrder } from 'src/app/order/models';
import { Router } from '@angular/router';

export class SortModel {
  constructor(
    public name: string = '',
    public key: string = '',
    public isAsc: boolean = false
  ) {
  }
}
@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  sortProperties: Array<SortModel> = [
    { name: 'По цене по убыванию ', key: 'price', isAsc: false },
    { name: 'По цене по возрастанию', key: 'price', isAsc: true }
  ];
  sortProperty: SortModel | undefined;
  sortPropertyKey!: string;
  sortPropertyIsAsc!: boolean;

  get totalAmount(): number {
    return this.cartService.totalQuantity;
  }

  get totalSum(): number {
    return this.cartService.totalSum;
  }

  get productsInCart(): Array<ProductInCart> {
    return this.cartService.getProducts();
  }

  get isEmptyCart(): boolean {
    return this.cartService.isEmptyCart();
  }

  constructor(
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.setProductsFromStorage();
    this.setSortProperty(this.sortProperties[0]);
    // this.sub = this.communicationService.channel$.subscribe(
    //   data => this.cartService.addProduct(data)
    // );
  }

  onSortProperty(): void {
    this.setSortProperty(this.sortProperty);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onIncreaseQuantity(productInCart: ProductInCart): void {
    this.cartService.increaseProductQuantity(productInCart);
  }

  onDecreaseQuantity(productInCart: ProductInCart): void {
    this.cartService.substractProductFromCart(productInCart);
  }

  onRemove(product: ProductInCart): void {
    this.cartService.removeProduct(product);
  }

  onClear(): void {
    this.cartService.removeAllProducts();
  }

  onCreateOrder(): void { 

    const order = this.getOrderModel();
    this.router.navigateByUrl('/order/process', { state: order });

    // const order = this.getOrderModel();
    // this.orderService.createOrder(order);
    // const observer = {
    //   next: (order: Order) => {
    //     this.cartService.removeAllProducts();
    //     alert("Order succesfully created");
    //   },
    //   error: (err: any) => console.log(err)
    // };
    // this.sub = this.orderService.createOrder(order).subscribe(observer);

  }

  private getOrderModel() {

    const products: Array<ProductInOrder> = []
    this.productsInCart.forEach(element => {
      const productInOrder = new ProductInOrder(element.name, element.price, element.category, element.color, element.quantity);
      products.push(productInOrder);
    });
    const order = new Order(0, this.cartService.totalQuantity, this.cartService.totalSum, new Date(), this.uuidv4(), products);

    return order;
  }

  private setSortProperty(value: any): void {
    this.sortPropertyIsAsc = value.isAsc;
    this.sortPropertyKey = value.key;
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
