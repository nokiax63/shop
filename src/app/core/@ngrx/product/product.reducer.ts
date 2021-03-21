import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './product.state';
import * as ProductActions from './product.action'


export const reducer = createReducer(
  initialProductsState,

  on(ProductActions.getProducts, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ProductActions.getProductsSuccess, (state, { products }) => {

    const data = [...products];
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),

  on(ProductActions.getProduct, state => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),

  on(ProductActions.getProductSuccess, (state, { product }) => {
    const selectedProduct = { ...product };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedProduct
    };
  }),

  on(
    ProductActions.getProductsError, 
    ProductActions.getProductError,
    (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error
    };
  })

);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
