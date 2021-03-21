import { createAction, props } from '@ngrx/store';
import { IProduct, Product } from 'src/app/product/models/product';


export const getProducts = createAction('[Product List Page (App)] GET_PRODUCTS');


export const getProductsSuccess = createAction(
    '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
    props<{ products: IProduct[] }>()
);

export const getProductsError = createAction(
    '[Get Products Effect] GET_PRODUCTS_ERROR',
    props<{ error: Error | string }>()
);

export const getProduct = createAction(
    '[Add/Edit/View Product Page (App)] GET_PRODUCT',
    props<{ productId: number }>()
);

// Get Product Effect
export const getProductSuccess = createAction(
    '[Get Product Effect] GET_PRODUCT_SUCCESS',
    props<{ product: IProduct }>()
);

export const getProductError = createAction(
    '[Get Product Effect] GET_PRODUCT_ERROR',
    props<{ error: Error | string }>()
);
