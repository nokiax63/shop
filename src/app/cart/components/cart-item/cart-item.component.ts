import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/product-in-cart';

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

  onRemove(): void {
    this.removeProductTask.emit(this.productInCart);
  }

  onIncreaseQuantity(): void {
    this.increaseQuantity.emit(this.productInCart);
  }

  onDecreaseQuantity(): void {
    this.decreaseQuantity.emit(this.productInCart);
  }
}
