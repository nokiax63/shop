import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Product, ProductCategory, ProductColor } from "../models/product";

const products = [
    new Product(1, 'Xiaomi 8', 'Xiaomi is chinese phone', 6200, true, ProductCategory.Phone, [ProductColor.Black, ProductColor.White]),
    new Product(2, 'Iphone 11', 'Iphone is apple phone', 28000, false, ProductCategory.Phone, [ProductColor.Red, ProductColor.White]),
    new Product(3, 'Asus Vivobook', 'Good laptop', 21000, true, ProductCategory.Notebook, [ProductColor.Black, ProductColor.White])
];

@Injectable()
export class ProductService {

    constructor() { }

    getProduct(id: number | string | null): any {
        return products.find(x => x.id === id);
    }

    getProducts(): Observable<Array<Product>> {
        return of(products);
    }
}