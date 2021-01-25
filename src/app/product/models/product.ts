export enum ProductCategory {
    Notebook = 'Notebook',
    Phone = 'Phone'
}

export enum ProductColor {
    Red = 'Red',
    Black = 'Black',
    White = 'White'
}

export class Product {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description = '',
        public price = 0,
        public isAvailable = false,
        public category: ProductCategory = ProductCategory.Phone,
        public color: ProductColor[] = []
    ) {
    }
}
