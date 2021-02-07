import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../../order/services/communication.service';
import { CartService } from '../../../cart/services/cart.service';
import { ProductInCart } from '../../models/product-in-cart';

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
export class CartListComponent implements OnInit, OnDestroy  {

  private sub!: Subscription;
  sortProperties: Array<SortModel> = [
    { name: 'По цене по убыванию ', key: 'price', isAsc: false},
    { name: 'По цене по возрастанию', key: 'price', isAsc: true}
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
    private communicationService: CommunicationService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.setSortProperty(this.sortProperties[0]);
    this.sub = this.communicationService.channel$.subscribe(
      data => this.cartService.addProduct(data)
    );
  }

  onSortProperty(): void {
    this.setSortProperty(this.sortProperty);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onIncreaseQuantity(productInCart: ProductInCart): void {
    this.cartService.addProduct(productInCart.product);
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



  private setSortProperty(value: any): void {
    this.sortPropertyIsAsc = value.isAsc;
    this.sortPropertyKey = value.key;
  }
}
