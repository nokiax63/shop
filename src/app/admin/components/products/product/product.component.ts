import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/product/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = new Product();
  @Output() viewProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() editProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  onDetails(): void {
    this.viewProduct.emit(this.product);
  }

  onEdit(): void {
    this.editProduct.emit(this.product);
  }

  onDelete(): void {
    this.deleteProduct.emit(this.product)
  }
}
