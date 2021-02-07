import { Pipe, PipeTransform } from '@angular/core';
import { ProductInCart } from 'src/app/cart/models/product-in-cart';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<ProductInCart>| null, key: string, isAsc: boolean): Array<ProductInCart>| null {
    if (!value) {
      return [];
    }
    if (isAsc) {
      return value.sort((a: any, b: any) => {
        if (a.product[key] >= b.product[key]) { return 1; }
        if (a.product[key] < b.product[key]) { return -1; }
        return 0;
      });
    }
    else {
      return value.sort((a: any, b: any) => {
        if (a.product[key] <= b.product[key]) { return 1; }
        if (a.product[key] > b.product[key]) { return -1; }
        return 0;
      });
    }
  }
}
