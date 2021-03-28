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

export const getProduct = createAction(
    '[Add/Edit/View Product Page (App)] GET_PRODUCT',
    props<{ productId: number }>()
);

// Get Product Effect
// export const getProductSuccess = createAction(
//     '[Get Product Effect] GET_PRODUCT_SUCCESS',
//     props<{ product: IProduct }>()
// );

// export const getProductError = createAction(
//     '[Get Product Effect] GET_PRODUCT_ERROR',
//     props<{ error: Error | string }>()
// );

export const updateProduct = createAction(
    '[Product Form Page] UPDATE_PRODUCT',
    props<{ product: IProduct }>()
);

// Update Product Effect
export const updateProductSuccess = createAction(
    '[Update Product Effect] UPDATE_PRODUCT_SUCCESS',
    props<{ product: IProduct }>()
);

export const updateProductError = createAction(
    '[Update Product Effect] UPDATE_PRODUCT_ERROR',
    props<{ error: Error | string }>()
);

export const createProduct = createAction(
    '[Task Form Product] CREATE_PRODUCT',
    props<{ product: IProduct }>()
);

// Create Product Effect
export const createProductSuccess = createAction(
    '[Create Product Effect] CREATE_PRODUCT_SUCCESS',
    props<{ product: IProduct }>()
);

export const createProductError = createAction(
    '[Create Product Effect] CREATE_PRODUCT_ERROR',
    props<{ error: Error | string }>()
);


export const deleteProduct = createAction(
    '[Task List Product] DELETE_PRODUCT',
    props<{ product: IProduct }>()
);

// Delete Product Effect
export const deleteProductSuccess = createAction(
    '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
    props<{ product: IProduct }>()
);

export const deleteProductError = createAction(
    '[Delete Task Effect] DELETE_PRODUCT_ERROR',
    props<{ error: Error | string }>()
);
