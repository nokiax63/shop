import { ProductInOrder } from "./product-in-order";

export class Order {
    constructor(
        public id: number = 0,
        public totalQuantity: number = 0,
        public totalSum: number = 0,
        public date: Date,
        public number: string,
        public products: Array<ProductInOrder> = []
    ) {
    }
}
