import { ProductOutDto, ProductToBuyInDto } from './apiTypes';

export interface ShoppingListProductToBuyInDto extends ProductToBuyInDto {
    name: string;
    displayedPrice: number;
}

export type ProductsById = Record<string, ProductOutDto>;
