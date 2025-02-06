import { AppContext } from 'app/providers/AppContextProvider';
import React, { FunctionComponent, useContext } from 'react';
import trashIcon from 'shared/assets/trashIcon.svg';
import classNames from 'shared/lib/aliases/classNames';
import Spacing from 'shared/ui/spacing/Spacing';
import styles from './ShoppingListTable.module.scss';

const ShoppingListTable: FunctionComponent = () => {
    const {
        productsToBuy,
        getProductsListPrice,
        addOrIncrementProductToList,
        decrementProductAmountInList,
        deleteProductFromList
    } = useContext(AppContext);

    const incrementProduct = (productId: string, name: string, displayedPrice: number) => () => {
        addOrIncrementProductToList(productId, name, displayedPrice);
    };

    const decrementProduct = (productId: string) => () => {
        decrementProductAmountInList(productId);
    };

    const deleteProduct = (productId: string) => () => {
        deleteProductFromList(productId);
    };

    const totalListPrice = getProductsListPrice();

    return (
        <div className={styles.table}>
            <div>
                <div className={styles.rowWrapper}>
                    <div className={classNames(styles.productRow, styles.roundedTop)}>
                        <div className={classNames(styles.cell, styles.bold)}>Товар:</div>

                        <div className={classNames(styles.cell, styles.bold)}>Шт.:</div>

                        <div className={classNames(styles.cell)} />

                        <div className={classNames(styles.cell, styles.bold)}>Итог:</div>
                    </div>
                </div>

                {productsToBuy.map((product, index) => {
                    const { id: productId, name, amount, displayedPrice } = product;
                    const isLastInList = index === productsToBuy.length - 1;

                    return (
                        <div key={productId} className={styles.rowWrapper}>
                            <div
                                className={classNames(styles.productRow, {
                                    [styles.roundedBottom]: isLastInList
                                })}
                            >
                                <div className={styles.cell}>{name}</div>

                                <div className={styles.cell}>x{amount}</div>

                                <div className={styles.cell}>
                                    <button
                                        type="button"
                                        className={styles.incrementButton}
                                        onClick={incrementProduct(productId, name, displayedPrice)}
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.decrementButton}
                                        onClick={decrementProduct(productId)}
                                    >
                                        -
                                    </button>
                                </div>

                                <div className={styles.cell}>{(displayedPrice * amount).toFixed(1)} ₽</div>
                            </div>

                            <button type="button" className={styles.deleteButton} onClick={deleteProduct(productId)}>
                                <img src={trashIcon} alt="Удалить" />
                            </button>
                        </div>
                    );
                })}
            </div>

            <Spacing size={20} />

            <div className={styles.totalListPrice}>
                <span className={styles.totalListPriceDescription}>Итого: </span>
                {totalListPrice.toFixed(1)} ₽
            </div>
        </div>
    );
};

export default ShoppingListTable;
