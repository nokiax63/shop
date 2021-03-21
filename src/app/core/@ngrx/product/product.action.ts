import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/product/models/product';


export const getProducts = createAction('[Product List Page (App)] GET_PRODUCTS');


export const getProductsSuccess = createAction(
    '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
    props<{ products: IProduct[] }>()
);

export const getProductsError = createAction(
    '[Get Products Effect] GET_PRODUCTS_ERROR',
    props<{ error: Error | string }>()
);

