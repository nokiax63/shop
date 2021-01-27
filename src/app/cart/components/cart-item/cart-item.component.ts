import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/productInCart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() productInCart: ProductInCart = new ProductInCart();
  @Output() removeProductTask: EventEmitter<ProductInCart> = new EventEmitter();
  @Output() increaseQuantity: EventEmitter<ProductInCart> = new EventEmitter();
  @Output() decreaseQuantity: EventEmitter<ProductInCart> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onRemove(productInCart: ProductInCart): void {
    this.removeProductTask.emit(productInCart);
  }

  onIncreaseQuantity(productInCart: ProductInCart): void {
    this.increaseQuantity.emit(productInCart);
  }

  onDecreaseQuantity(productInCart: ProductInCart): void {
    this.decreaseQuantity.emit(productInCart);
  }
}
