import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = new Product();
  @Output() buyProductTask: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(): void {
      this.buyProductTask.emit(this.product);
  }
}
