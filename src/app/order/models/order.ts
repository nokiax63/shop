import { ProductInOrder } from "./product-in-order";

export class Phone {
    constructor(
        public phone: string = null
    ) {

    }
}

export class Order {
    constructor(
        public id: number = 0,
        public totalQuantity: number = 0,
        public totalSum: number = 0,
        public date: Date,
        public number: string,
        public products: Array<ProductInOrder> = [],
        public firstName: string = null,
        public lastName: string = null,
        public email: string = null,
        public phones: Array<Phone> = [],
        public address: string = null,
    ) {
    }
}
