

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { Product } from 'src/app/product/models/product';
import { ProductPromiseService } from 'src/app/product/services';

@Injectable({
    providedIn: 'root'
})
export class EditResolver implements Resolve<Product> {

    constructor(private productPromiseService: ProductPromiseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = route.paramMap.get('productId') || -1;
        const result = this.productPromiseService.getProduct(+id);
        return from(result);
    }
}