import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, Product, ProductCategory } from 'src/app/product/models/product';
import * as RouterActions from './../../../../core/@ngrx/router/router.actions';
// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//NgRX
import { selectSelectedProductByUrl } from 'src/app/core/@ngrx';
import { Store } from '@ngrx/store';
import * as ProductActions from './../../../../core/@ngrx/product/product.action';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  product!: Product;
  isDirty = true;
  categories: Array<ProductCategory> = [ProductCategory.Phone, ProductCategory.Notebook];
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store) { }

  ngOnInit(): void {
    let observer: any = {
      next: (product: Product) => {
        this.product = { ...product };

      },
      error(err: any) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store.select(selectSelectedProductByUrl)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveProduct(): void {
    this.isDirty = false;
    const product = { ...this.product } as IProduct;
    if (product.id) {
      this.store.dispatch(ProductActions.updateProduct({ product }));
    }
    else {
      this.store.dispatch(ProductActions.createProduct({ product }));
    }
    this.closePage();
  }

  closePage(): void {
    this.store.dispatch(RouterActions.go({
      path: ['/admin/product-list']
    }));
  }

  onGoBack(): void {
    this.closePage();
  }
}