import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { ProductService } from '../product/services';
import { OrderComponent } from './components/orders/order/order.component';

@NgModule({
  declarations: [
    AdminRoutingModule.components,
    AdminComponent,
    OrderListComponent,
    OrderComponent
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
