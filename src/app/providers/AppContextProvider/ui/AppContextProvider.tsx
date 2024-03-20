import { FunctionComponent, PropsWithChildren, useState } from 'react';
import AppContext from 'app/providers/AppContextProvider/lib/AppContext';
import { ShoppingListProductToBuyInDto } from 'app/types/api/apiTypesHelper';
import { PromocodeDto } from 'app/types/api/apiTypes';

const AppContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [productsToBuy, setProductsToBuy] = useState<ShoppingListProductToBuyInDto[]>([]);
    const [promoCode, setPromoCode] = useState<PromocodeDto | undefined>();

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

    const deleteProductFromList = (productId: string) =>
        setProductsToBuy((currentProducts) => currentProducts.filter((product) => product.id !== productId));

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

    const getProductsListPrice = () =>
        productsToBuy.reduce((totalPrice, product) => totalPrice + product.displayedPrice * product.amount, 0);

    return (
        <AppContext.Provider
            value={{
                productsToBuy,
                addOrIncrementProductToList,
                deleteProductFromList,
                decrementProductAmountInList,
                getProductsListPrice,

                promoCode,
                setPromoCode
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
