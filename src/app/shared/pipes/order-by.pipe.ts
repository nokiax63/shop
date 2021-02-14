import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<any>| null, key: string, isAsc: boolean): Array<any>| null {

    if (!Array.isArray(value)) {
      return value;
    }

    if (isAsc) {
      return value.sort((a: any, b: any) => {
        if (a[key] >= b[key]) { return 1; }
        if (a[key] < b[key]) { return -1; }
        return 0;
      });
    }
    else {
      return value.sort((a: any, b: any) => {
        if (a[key] <= b[key]) { return 1; }
        if (a[key] > b[key]) { return -1; }
        return 0;
      });
    }
  }
}
