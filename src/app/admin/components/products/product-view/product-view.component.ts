import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductPromiseService } from 'src/app/product/services';
import { Product } from 'src/app/product/models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!: Product;

  constructor(
    private productPromiseService: ProductPromiseService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.product = new Product();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.productPromiseService.getProduct(Number(params.get('Id')))))
      .subscribe(res => {
        if (res) {
          this.product = res;
        }
      });
  }

  onClose() :void {
    this.location.back();
  }

}
