import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './services/product.service';
import { ProductComponent, ProductListComponent, ProductFormComponent } from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
