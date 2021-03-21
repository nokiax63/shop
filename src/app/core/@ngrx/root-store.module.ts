import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ProductStoreModule } from './product/product-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {
      // All checks will automatically be disabled in production builds
      runtimeChecks: {
        strictStateImmutability: true,      // default value is true
        strictActionImmutability: true,     // default value is true
        strictStateSerializability: true,   // default value is false
        strictActionSerializability: true,  // default value is false
        strictActionWithinNgZone: true,     // default value is false
        strictActionTypeUniqueness: true    // default value is false
      }
    }),
    EffectsModule.forRoot([]),
    ProductStoreModule,

    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ]
})
export class RootStoreModule { }
