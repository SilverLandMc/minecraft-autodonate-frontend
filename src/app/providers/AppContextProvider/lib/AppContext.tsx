import { createContext } from 'react';
import noop from 'shared/lib/noop/noop';
import { ShoppingListProductToBuyInDto } from 'app/types/api/apiTypesHelper';

export interface AppContextState {
    productsToBuy: ShoppingListProductToBuyInDto[];
    addOrIncrementProductToList(productId: string, name: string, displayedPrice: number): void;
    deleteProductFromList(productId: string): void;
    decrementProductAmountInList(productId: string): void;
}

const AppContext = createContext<AppContextState>({
    productsToBuy: [],
    addOrIncrementProductToList: noop,
    deleteProductFromList: noop,
    decrementProductAmountInList: noop
});

export default AppContext;
