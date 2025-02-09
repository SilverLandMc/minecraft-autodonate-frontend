import { PromocodeOutDto } from 'app/types/api/apiTypes';
import { ShoppingListProductToBuyInDto } from 'app/types/api/apiTypesHelper';
import { createContext } from 'react';

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
