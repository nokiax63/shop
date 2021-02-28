import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AdminRoutingModule.components,
    AdminComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    ProductService
  ]
})
export class AdminModule { }
