import { ProductCategory, ProductColor } from "src/app/product/models/product";

export class ProductInOrder {
    constructor(
        public name: string = '',
        public price = 0,
        public category: ProductCategory = ProductCategory.Phone,
        public color: ProductColor = ProductColor.Red,
        public quantity = 0,
    ) {
    }
}