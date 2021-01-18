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
    name = '';
    description = '';
    price = 0;
    isAvailable = false;
    category: ProductCategory = ProductCategory.Phone;
    color: ProductColor[] = [];
}
