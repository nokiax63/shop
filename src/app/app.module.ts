import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { OrderModule } from '../app/order/order.module';
import { FirstComponent } from '../app/first/first.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';

import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { Router } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponent
  ],
  imports: [
    ProductModule,
    CartModule,
    // OrderModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,


    // must be the last
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
