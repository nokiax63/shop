import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../../order/services/communication.service';
import { CartService } from '../../../cart/services/cart.service';
import { ProductInCart } from '../../models/productInCart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy  {

  private sub!: Subscription;

  get totalAmount(): number {
    return this.cartService.getTotalAmount();
  }

  get totalSum(): number {
    return this.cartService.getTotalSum();
  }

  get productsInCart(): Array<ProductInCart> {
    return this.cartService.getProducts();
  }

  constructor(
    private communicationService: CommunicationService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.sub = this.communicationService.channel$.subscribe(
      data => this.cartService.addProduct(data)
    );
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
}
