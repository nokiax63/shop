import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from './services/product.service';
import { ProductComponent, ProductListComponent } from './components';

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
