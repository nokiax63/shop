import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductService, ProductPromiseService } from './services';
import { ProductComponent, ProductListComponent, ProductFormComponent, ProductViewComponent } from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ],
  providers: [
    ProductService,
    ProductPromiseService
  ]
})
export class ProductModule { }
