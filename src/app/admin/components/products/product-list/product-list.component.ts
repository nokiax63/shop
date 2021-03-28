import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as RouterActions from './../../../../core/@ngrx/router/router.actions';
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
  products$!: Observable<ReadonlyArray<IProduct>>;
  productsError$!: Observable<Error | string>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsData);
    this.productsError$ = this.store.select(selectProductsError);
  }

  onCreateProduct(): void {
    const link = ['/admin/product-add'];
    this.store.dispatch(RouterActions.go({
      path: link
    }));


  }

  onEditProduct(product: any): void {
    const link = ['/admin/product-edit', product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));

  }

  onViewProduct(product: any): void {
    const link = ['/admin/product-details', product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }

  onDeleteProduct(product: any) :void {
    const productToDelete: IProduct = { ...product };
    this.store.dispatch(ProductActions.deleteProduct({ product: productToDelete }));
  }
}
