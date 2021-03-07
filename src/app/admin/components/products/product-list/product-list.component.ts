import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/models/product';
import { ProductPromiseService } from 'src/app/product/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Promise<Array<Product>>;

  constructor(
    private router: Router,
    private productsPromiseService: ProductPromiseService
  ) { }

  ngOnInit(): void {
    this.products = this.productsPromiseService.getProducts();
  }

  onCreateProduct(): void {
    const link = ['/admin/product-add'];
    this.router.navigate(link);

  }

  onEditProduct(product: any): void {
    const link = ['/admin/product-edit', product.id];
    this.router.navigate(link);

  }

  onViewProduct(product: any): void {
    const link = ['/admin/product-details', product.id];
    this.router.navigate(link);
  }

  onDeleteProduct(product: any) :void {
    this.productsPromiseService.deleteProduct(product)
      .then(() => (this.products = this.productsPromiseService.getProducts()))
      .catch(err => console.log(err));

  }
}
