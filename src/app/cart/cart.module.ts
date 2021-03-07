import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CartService } from './services/cart.service';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderService } from '../order/services';
@NgModule({
  declarations: [
    CartRoutingModule.components,
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ],
  providers: [CartService, OrderService]
})
export class CartModule { }
