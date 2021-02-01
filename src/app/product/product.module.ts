import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
