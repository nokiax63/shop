import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductFormComponent } from '../components';


@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ProductFormComponent> {

    constructor() { }

    canDeactivate(component: ProductFormComponent): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('dirty:', component.isDirty);
        if (component.isDirty) {
            return confirm('You don\'t save product changes');
        }
        return true;
    }
}