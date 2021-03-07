import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductPromiseService } from 'src/app/product';
import { Product, ProductCategory } from 'src/app/product/models/product';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product!: Product;
  isDirty = true;
  categories: Array<ProductCategory> = [ProductCategory.Phone, ProductCategory.Notebook];

  constructor(
    private productPromiseService: ProductPromiseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = new Product();

    this.route.paramMap
      .pipe(

        switchMap((params: ParamMap) => {
          return params.get('Id')
            ? this.productPromiseService.getProduct(Number(params.get('Id')))
            : Promise.resolve(null);
        }))
      .subscribe(res => {
        if (res) {
          this.product = res;
        }
      });
  }

  onSaveProduct(): void {
    this.isDirty = false;
    const product = { ...this.product } as Product;
    const method = product.id ? this.updateProduct(): this.createProduct()
    this.closePage();
  }

  createProduct(): void {
    const product = { ...this.product } as Product;


    this.productPromiseService.createProduct(product)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  updateProduct(): void {    
    const product = { ...this.product } as Product;

    this.productPromiseService.updateProduct(product)
    .then(() => this.onGoBack())
    .catch(err => console.log(err));
  }

  closePage(): void {
    this.router.navigate(['/admin/product-list']);
  }

  onGoBack(): void {
    this.closePage();
  }
}