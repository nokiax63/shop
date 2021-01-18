import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../product/models/product';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() removeFromCart: EventEmitter<Product> = new EventEmitter();

  trackByItems(index: number, item: Product): string { return item.name; }

  constructor() { }

  ngOnInit(): void {
  }

  onRemove(product: Product): void {
    this.removeFromCart.emit(product);
  }
}
