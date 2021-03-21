import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductStoreModule { }
