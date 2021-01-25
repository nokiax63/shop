import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommunicationService } from '../../../order/services/communication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productsInCart: Product[] = [];

  constructor(
    private productsService: ProductService,
    private communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onBuyProductTask(product: any): void {
    this.communicationService.publishData(product);
  }
}
