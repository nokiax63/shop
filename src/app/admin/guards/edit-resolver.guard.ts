

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class EditResolver implements Resolve<Product> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = route.paramMap.get('Id') || -1;
        const result = this.productService.getProduct(+id);
        return result;
    }
}