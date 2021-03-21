import { IProduct } from 'src/app/product/models/product';

export interface ProductsState {
    data: ReadonlyArray<IProduct>;
    selectedProduct: Readonly<IProduct>| null;
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
    data: [],
    selectedProduct: null,
    loading: false,
    loaded: false,
    error: ''
};
