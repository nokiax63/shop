import { ProductCategory, ProductColor } from 'src/app/product/models/product';

export class ProductInCart {
    constructor(
        public id: number = 0,
        public productId: number = 0,
        public name: string = '',
        public description = '',
        public price = 0,
        public isAvailable = false,
        public category: ProductCategory = ProductCategory.Phone,
        public color: ProductColor = ProductColor.Red,
        public quantity = 0,
    ) {
    }
}
