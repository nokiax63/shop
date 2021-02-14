import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CartItemComponent, CartListComponent } from './components';
import { CartService } from './services/cart.service';
@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CartListComponent
  ],
  providers: [CartService]
})
export class CartModule { }
