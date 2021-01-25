import { Product } from 'src/app/product/models/product';

export class ProductInCart {
    constructor(
        public product: Product = new Product(),
        public quantity = 0,
    ) {
    }
}
