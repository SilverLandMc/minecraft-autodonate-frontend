import { FunctionComponent, PropsWithChildren, useState } from 'react';
import AppContext from 'app/providers/AppContextProvider/lib/AppContext';
import { ProductToBuyInDto } from 'app/types/api/apiTypes';

const AppContextProvider: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
    const [productsToBuy, setProductsToBuy] = useState<ProductToBuyInDto[]>([]);

    const addOrIncrementProductToList = (productId: string) =>
        setProductsToBuy((currentProducts) => {
            const isProductInList = currentProducts.some((product) => product.id === productId);

            let nextProductList: ProductToBuyInDto[];

            if (isProductInList) {
                nextProductList = currentProducts.map(({ id, amount }) => ({
                    id,
                    amount: id === productId ? amount + 1 : amount
                }));
            } else {
                nextProductList = [...currentProducts, { id: productId, amount: 1 }];
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
            currentProducts.map(({ id, amount }) => ({
                id,
                amount: id === productId ? amount - 1 : amount
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
