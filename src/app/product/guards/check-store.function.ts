import { Store } from '@ngrx/store';
import { selectProductsLoaded } from './../../core/@ngrx';
import * as ProductsActions from '../../core/@ngrx/product/product.action';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';

export function checkStore(store: Store): Observable<boolean> {
  return store.select(selectProductsLoaded).pipe(
    // make a side effect
    tap((loaded: boolean) => {
      if (!loaded) {
        store.dispatch(ProductsActions.getProducts());
      }
    }),

    // wait, while loaded = true
    filter((loaded: boolean) => loaded),

    // automatically unsubscribe
    take(1)
  );
}
