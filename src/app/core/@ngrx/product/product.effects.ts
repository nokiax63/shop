import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import * as ProductActions from './product.action'

// rxjs
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ProductPromiseService } from 'src/app/product';


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productPromiseService: ProductPromiseService) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      switchMap(() => 
        this.productPromiseService.getProducts()
          .then(products => ProductActions.getProductsSuccess({products}))
          .catch(error => ProductActions.getProductsError({error}))
      )
    )
  );

  getProduct$: Observable<Action> =createEffect(()=> 
    this.actions$.pipe(
      ofType(ProductActions.getProduct),
      pluck('productId'),
      switchMap(productId=> 
        this.productPromiseService.getProduct(productId)
          .then(product => ProductActions.getProductSuccess({product}))
          .catch(error => ProductActions.getProductError({error}))
      )
    )
  )
}
