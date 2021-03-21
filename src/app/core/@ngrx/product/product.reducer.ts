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
      loaded: true,      
      selectedTask: null
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

  on(ProductActions.deleteProductSuccess, (state, { product }) => {
    const data = state.data.filter(t => t.id !== product.id);
    return {
      ...state,
      data
    };
  }),


  on(
    ProductActions.getProductsError,
    ProductActions.getProductError,
    ProductActions.deleteProductError,
    (state, { error }) => {
      return {
        ...state,
        loading: false,
        loaded: true,
        error
      };
    }),

  on(ProductActions.updateProductSuccess, (state, { product }) => {
    const data = [...state.data];
    const index = data.findIndex(t => t.id === product.id);
    data[index] = { ...product };
    return {
      ...state,
      data
    };
  }),

  on(ProductActions.createProductSuccess, (state, { product }) => {
    const data = [...state.data, { ...product }];
    return {
      ...state,
      data
    };
  }),


  on(
    ProductActions.updateProductError, 
    ProductActions.createProductError,
    (state, { error }) => {
    return {
      ...state,
      error
    };
  })

);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
