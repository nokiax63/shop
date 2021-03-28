import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductColor } from './../../models/product';
import { CartService } from 'src/app/cart/services/cart.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//NgRX
import { selectSelectedProductByUrl } from 'src/app/core/@ngrx';
import { Store } from '@ngrx/store';

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
    private store: Store,
    private cartService: CartService) { }

  ngOnInit(): void {

    const observer: any = {
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

  onChange(color: any): void {
    this.selectedColor = color.value;
  }

  onBuy(): void {
    this.cartService.addProduct(this.product, this.selectedColor);
  }
}
