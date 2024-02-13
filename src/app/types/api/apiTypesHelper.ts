// Для случаев, когда что-то не закрыто генерацией из-за её особенностей или недоработанности документации

import { ProductToBuyInDto } from 'app/types/api/apiTypes';

export interface ShoppingListProductToBuyInDto extends ProductToBuyInDto {
    name: string;
    displayedPrice: number;
}
