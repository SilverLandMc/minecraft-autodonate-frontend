import { createContext } from 'react';
import { PromocodeOutDto } from '@/shared/api/apiTypes';
import { ShoppingListProductToBuyInDto } from '@/shared/api/apiTypesHelper';

export interface AppContextState {
    productsToBuy: ShoppingListProductToBuyInDto[];
    addOrIncrementProductToList(productId: string, name: string, displayedPrice: number): void;
    deleteProductFromList(productId: string): void;
    decrementProductAmountInList(productId: string): void;
    getProductsListPrice(): number;

    promoCode?: PromocodeOutDto;
    setPromoCode(promoCode?: PromocodeOutDto): void;
}

const AppContext = createContext<AppContextState | null>(null);

export default AppContext;
