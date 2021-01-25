import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './components/order/order.component';
import { ProductModule } from '../../app/product/product.module';
import { CartModule } from '../../app/cart/cart.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    CartModule,
    ProductModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule { }
