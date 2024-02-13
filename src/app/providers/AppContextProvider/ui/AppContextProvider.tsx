import { FunctionComponent, PropsWithChildren, useState } from 'react';
import AppContext from 'app/providers/AppContextProvider/lib/AppContext';
import { ShoppingListProductToBuyInDto } from 'app/types/api/apiTypesHelper';

const AppContextProvider: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
    const [productsToBuy, setProductsToBuy] = useState<ShoppingListProductToBuyInDto[]>([]);

    const addOrIncrementProductToList = (productId: string, name: string, displayedPrice: number) =>
        setProductsToBuy((currentProducts) => {
            const isProductInList = currentProducts.some((product) => product.id === productId);

            let nextProductList: ShoppingListProductToBuyInDto[];

            if (isProductInList) {
                nextProductList = currentProducts.map(({ amount, ...props }) => ({
                    ...props,
                    amount: props.id === productId ? amount + 1 : amount
                }));
            } else {
                nextProductList = [...currentProducts, { id: productId, amount: 1, name, displayedPrice }];
            }

            return nextProductList;
        });

    const deleteProductFromList = (productId: string) => {
        setProductsToBuy((currentProducts) => currentProducts.filter((product) => product.id !== productId));
    };

    const decrementProductAmountInList = (productId: string) => {
        if (productsToBuy.find((product) => product.id === productId)?.amount === 1) {
            deleteProductFromList(productId);
            return;
        }

        setProductsToBuy((currentProducts) =>
            currentProducts.map(({ amount, ...props }) => ({
                ...props,
                amount: props.id === productId ? amount - 1 : amount
            }))
        );
    };

    return (
        <AppContext.Provider
            value={{ productsToBuy, addOrIncrementProductToList, deleteProductFromList, decrementProductAmountInList }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
