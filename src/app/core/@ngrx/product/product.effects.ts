import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import * as ProductActions from './product.action'

// rxjs
import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap, map } from 'rxjs/operators';

import { ProductPromiseService } from 'src/app/product/services';
import { IProduct } from 'src/app/product/models/product';

// router
import * as RouterActions from './../router/router.actions';

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
          .then(products => ProductActions.getProductsSuccess({ products }))
          .catch(error => ProductActions.getProductsError({ error }))
      )
    )
  );

  // getProduct$: Observable<Action> = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductActions.getProduct),
  //     pluck('productId'),
  //     switchMap(productId =>
  //       this.productPromiseService.getProduct(productId)
  //         .then(product => ProductActions.getProductSuccess({ product }))
  //         .catch(error => ProductActions.getProductError({ error }))
  //     )
  //   )
  // );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      pluck('product'),
      concatMap((product: IProduct) =>
        this.productPromiseService.updateProduct(product)
          .then((updatedProduct: IProduct) => {
            // this.router.navigate(['/admin/product-list']);
            return ProductActions.updateProductSuccess({ product: updatedProduct })
          })
          .catch(error => ProductActions.updateProductError({ error }))
      )
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      pluck('product'),
      concatMap((product: IProduct) =>
        this.productPromiseService.createProduct(product)
          .then((createdProduct: IProduct) => {
            // this.router.navigate(['/admin/product-list']);
            return ProductActions.createProductSuccess({ product: createdProduct });
          })
          .catch(error => ProductActions.createProductError({ error }))
      )
    )
  );

  deleteTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      pluck('product'),
      concatMap((product: IProduct) =>
        this.productPromiseService.deleteProduct(product)
          .then(() => {
            return ProductActions.deleteProductSuccess({ product });
          }
          )
          .catch(error => ProductActions.deleteProductError({ error }))
      )
    )
  );

  createUpdateTaskSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProductSuccess, ProductActions.updateProductSuccess),
      map(action =>
        RouterActions.go({
          path: ['/admin/product-list']
        })
      )
    );
  });

}
