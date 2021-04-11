import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, ParamMap } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import { selectProductsData } from './../../core/@ngrx';
import * as RouterActions from '../../core/@ngrx/router/router.actions';

// rxjs
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { checkStore } from './check-store.function';
import { Product } from '../models/product';


@Injectable({
    providedIn: 'root'
})
export class ProductExistsGuard implements CanActivate {
    constructor(private store: Store) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return checkStore(this.store).pipe(
            switchMap(() => {
                
                const id = +route?.paramMap?.get('productId');
                return this.hasProduct(id);
            })
        );
    }

    private hasProduct(id: number): Observable<boolean> {
        return this.store.select(selectProductsData).pipe(

            // check if task with id exists
            map((products: Product[]) => !!products.find(pr => pr.id === id)),

            // make a side effect
            tap(result => {
                if (!result) {
                    this.store.dispatch(RouterActions.go({ path: ['/home'] }));
                }
            }),

            // automatically unsubscribe
            take(1)
        );
    }
}
