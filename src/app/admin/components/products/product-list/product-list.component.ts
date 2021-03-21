import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/product/models/product';

// @Ngrx
import { Store } from '@ngrx/store';
import * as ProductActions from '../../../../core/@ngrx/product/product.action'
// rxjs
import { Observable } from 'rxjs';
import { selectProductsData, selectProductsError } from 'src/app/core/@ngrx';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit { 
  proudcts$!: Observable<ReadonlyArray<IProduct>>;
  productsError$!: Observable<Error | string>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proudcts$ = this.store.select(selectProductsData);
    this.productsError$ = this.store.select(selectProductsError);
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
    const productToDelete: IProduct = { ...product };
    this.store.dispatch(ProductActions.deleteProduct({ product: productToDelete }));
  }
}
