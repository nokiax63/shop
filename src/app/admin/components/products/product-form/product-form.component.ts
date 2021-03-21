import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProduct, Product, ProductCategory } from 'src/app/product/models/product';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//NgRX
import { AppState, ProductsState } from 'src/app/core/@ngrx';
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
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let observer: any = {
      next: (productState: ProductsState) => {
        this.product = { ...productState.selectedProduct } as Product;
        if (productState.selectedProduct) {
          this.product = {...productState.selectedProduct} as Product;
        } else {
          this.product = new Product();
        }
      },
      error(err: any) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store.select('products')
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);

    observer = {
      ...observer,
      next: (params: ParamMap) => {
        const id = Number(params.get('productId'));
        if (id) {
          this.store.dispatch(ProductActions.getProduct({ productId: +id }));
        }
      }
    };

    this.route.paramMap.subscribe(observer);
  }
  
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveProduct(): void {
    this.isDirty = false;
    const product = { ...this.product } as IProduct;
    if (product.id) {
      this.store.dispatch(ProductActions.updateProduct({product}));
    }
    else {
      this.store.dispatch(ProductActions.createProduct({product}));
    }
    this.closePage();
  }

  closePage(): void {
    this.router.navigate(['/admin/product-list']);
  }

  onGoBack(): void {
    this.closePage();
  }
}