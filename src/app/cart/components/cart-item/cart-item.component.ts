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
  @Output() addProductInCartTask: EventEmitter<ProductInCart> = new EventEmitter();
  @Output() substractProductInCart: EventEmitter<ProductInCart> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onRemove(productInCart: ProductInCart): void {
    this.removeProductTask.emit(productInCart);
  }

  onAddQuantity(productInCart: ProductInCart): void {
    this.addProductInCartTask.emit(productInCart);
  }

  onSubstractQuantity(productInCart: ProductInCart): void {
    this.substractProductInCart.emit(productInCart);
  }
}
