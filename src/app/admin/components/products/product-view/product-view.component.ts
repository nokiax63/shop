import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { Location } from '@angular/common';

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
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    private location: Location) { }

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

  onClose(): void {
    this.location.back();
  }

}
