import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = new Product();
  @Output() buyProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() editProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(): void {
    this.buyProduct.emit(this.product);
  }

  onEdit(): void {
    this.editProduct.emit(this.product);
  }
}
