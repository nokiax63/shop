import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = new Product();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>  this.productService.getProduct(Number(params.get('productId')))))
      .subscribe(res => {
        if (res) {
          this.product = res;
        }
      });
  }

  onSaveProduct(): void {
    const product = { ...this.product } as Product;

    if (product.id) {
      this.productService.updateProduct(product);
    } else {
      this.productService.createProduct(product);
    }
    this.closePage();
  }

  closePage(): void {
    this.router.navigate(['/home']);
  }

  onGoBack(): void {
    this.closePage();
  }
}
