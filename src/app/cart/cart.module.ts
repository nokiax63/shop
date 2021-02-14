import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CartService } from './services/cart.service';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
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
  providers: [CartService]
})
export class CartModule { }
