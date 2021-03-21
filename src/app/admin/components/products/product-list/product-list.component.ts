import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/models/product';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, } from './../../../../core/@ngrx/app.state'
import * as ProductActions from '../../../../core/@ngrx/product/product.action'
// rxjs
import { Observable } from 'rxjs';
import { ProductsState } from 'src/app/core/@ngrx';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {  
  productState$!: Observable<ProductsState>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productState$ = this.store.select('products');
    this.store.dispatch(ProductActions.getProducts());
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
    // this.productsPromiseService.deleteProduct(product)
    //   .then(() => (this.products = this.productsPromiseService.getProducts()))
    //   .catch(err => console.log(err));

  }
}
