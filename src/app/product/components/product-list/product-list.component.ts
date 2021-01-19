import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  // Думаю, что тип этой коллекции должен включать еще и количество купленого товара
  productsInCart: Product[] = [];

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onBuyProductTask(product: any): void {
    this.productsInCart.push(product);
  }

  onRemoveFromCart(product: any): void {
    const indexProduct = this.productsInCart.indexOf(product);
    this.productsInCart.splice(indexProduct, 1);
  }
}
