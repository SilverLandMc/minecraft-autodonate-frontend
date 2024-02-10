import { createContext } from 'react';
import { ProductToBuyInDto } from 'app/types/api/apiTypes';
import noop from 'shared/lib/noop/noop';

export interface AppContextState {
    productsToBuy: ProductToBuyInDto[];
    addOrIncrementProductToList(productId: string): void;
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
