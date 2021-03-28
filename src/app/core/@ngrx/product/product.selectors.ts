import { createFeatureSelector, createSelector  } from '@ngrx/store';
import { Product } from 'src/app/product/models/product';
import { selectRouterState } from './../router';

import { ProductsState } from './product.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProductsData = createSelector(selectProductsState, (state: ProductsState) => state.data);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

export const selectSelectedProductByUrl = createSelector(
    selectProductsData,
    selectRouterState,
    (products, router): Product => {
        const productId = router.state.params.productId;
        if (productId && Array.isArray(products)) {
            return products.find(task => task.id === +productId);
        } else {
            return new Product();
        }
});
