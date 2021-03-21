import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductColor } from './../../models/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//NgRX
import { AppState, ProductsState } from 'src/app/core/@ngrx';
import { Store } from '@ngrx/store';
import * as ProductActions from './../../../core/@ngrx/product/product.action';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  product!: Product;
  selectedColor!: ProductColor;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    let observer: any = {
      next: (productState: ProductsState) => {
        this.product = { ...productState.selectedProduct } as Product;
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

  onChange(color: any): void {
    this.selectedColor = color.value;
  }

  onBuy(): void {
    this.cartService.addProduct(this.product, this.selectedColor);
  }
}
