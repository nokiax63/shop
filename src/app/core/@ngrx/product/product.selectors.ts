import { createFeatureSelector, createSelector  } from '@ngrx/store';

import { AppState } from './../app.state';
import { ProductsState } from './product.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProductsData = createSelector(selectProductsState, (state: ProductsState) => state.data);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);