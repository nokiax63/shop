import { Component, OnInit } from '@angular/core';
import { Product, ProductColor } from './../../models/product';
import { ProductPromiseService } from './../../services';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!: Product;
  selectedColor!: ProductColor;

  constructor(
    private productPromiseService: ProductPromiseService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = new Product();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.productPromiseService.getProduct(Number(params.get('productId')))))
      .subscribe(res => {
        if (res) {
          this.product = res;
          this.selectedColor = this.product.colors.length > 0 ? this.product.colors[0] : ProductColor.Red;
        }
      });
  }

  onChange(color: any): void {
    this.selectedColor = color.value;
  }

  onBuy(): void {
    this.cartService.addProduct(this.product, this.selectedColor);
  }
}
