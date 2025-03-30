// Для случаев, когда что-то не закрыто генерацией из-за недоработанности документации со стороны бэкенда

import { ProductToBuyInDto } from './apiTypes';

export interface ShoppingListProductToBuyInDto extends ProductToBuyInDto {
    name: string;
    displayedPrice: number;
}
