import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommunicationService } from '../../../order/services/communication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Promise<Array<Product>>;
  productsInCart: Product[] = [];

  constructor(
    private router: Router,
    private productsService: ProductService,
    private communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onEditProduct(product: any): void {
    const link = ['/edit', product.id];
    this.router.navigate(link);

  }

  onViewProduct(product: any): void {
    const link = ['/details', product.id];
    this.router.navigate(link);
  }

  onBuyProduct(product: any): void {
    this.communicationService.publishData(product);
  }
}
