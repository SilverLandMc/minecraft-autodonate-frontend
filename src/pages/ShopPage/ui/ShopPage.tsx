import React, { FunctionComponent, useContext } from 'react';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import styles from './ShopPage.module.scss';
import Section from 'shared/ui/Section/Section';
import { AppContext } from 'app/providers/AppContextProvider';

interface Props {
    productCategory: ProductCategory;
}

const ShopPage: FunctionComponent<Props> = ({ productCategory }) => {
    const { productsToBuy, addOrIncrementProductToList, deleteProductFromList, decrementProductAmountInList } =
        useContext(AppContext);

    const products = [{ id: '1' }, { id: '2' }];

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                Продукты:
                {products.map(({ id: productId }) => (
                    <div key={productId}>
                        id: {productId} <button onClick={() => addOrIncrementProductToList(productId)}>+</button>
                        <button onClick={() => decrementProductAmountInList(productId)}>-</button>
                        <button onClick={() => deleteProductFromList(productId)}>Удалить</button>
                    </div>
                ))}
                Корзина:
                {productsToBuy.map(({ id, amount }) => (
                    <div key={id}>
                        id: {id}. amount: {amount}
                    </div>
                ))}
            </Section>
        </div>
    );
};

export default ShopPage;
