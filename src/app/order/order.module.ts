import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../../app/product/product.module';
import { CartModule } from '../../app/cart/cart.module';
import { OrderRoutingModule } from './order-routing.module'
import { OrderComponent } from './order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncEmailValidatorDirective } from '../shared/validators/async-email-validator.directive';
import { ProcessOrderPhoneComponent } from './components/process-order-phone/process-order-phone.component';

@NgModule({
  declarations: 
    [
      OrderRoutingModule.components,
      AsyncEmailValidatorDirective,
      ProcessOrderPhoneComponent
    ],
  imports: [
    CommonModule,
    CartModule,
    ProductModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  exports: [
    OrderComponent, 
    AsyncEmailValidatorDirective
  ]
})
export class OrderModule { }
