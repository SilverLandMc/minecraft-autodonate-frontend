import { createContext } from 'react';
import noop from 'shared/lib/noop/noop';
import { ShoppingListProductToBuyInDto } from 'app/types/api/apiTypesHelper';
import { PromocodeOutDto } from 'app/types/api/apiTypes';

export interface AppContextState {
    productsToBuy: ShoppingListProductToBuyInDto[];
    addOrIncrementProductToList(productId: string, name: string, displayedPrice: number): void;
    deleteProductFromList(productId: string): void;
    decrementProductAmountInList(productId: string): void;
    getProductsListPrice(): number;

    promoCode?: PromocodeOutDto;
    setPromoCode(promoCode?: PromocodeOutDto): void;
}

const AppContext = createContext<AppContextState>({
    productsToBuy: [],
    addOrIncrementProductToList: noop,
    deleteProductFromList: noop,
    decrementProductAmountInList: noop,
    getProductsListPrice: noop,
    setPromoCode: noop
});

export default AppContext;
