export enum ProductCategory {
    Notebook = 'Notebook',
    Phone = 'Phone'
}

export enum ProductColor {
    Red = 'Red',
    Black = 'Black',
    White = 'Green'
}

export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    isAvailable: boolean,
    category: ProductCategory,
    colors: ProductColor[]
}

export class Product implements IProduct {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description = '',
        public price = 0,
        public isAvailable = false,
        public category: ProductCategory = ProductCategory.Phone,
        public colors: ProductColor[] = []
    ) {
    }
}
