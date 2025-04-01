import { productStore } from 'entities/product';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { cartStore } from '@/entities/cart';
import trashIcon from '@/shared/assets/trashIcon.svg';
import classNames from '@/shared/lib/aliases/classNames';
import Spacing from '@/shared/ui/spacing/Spacing';
import styles from './ShoppingListTable.module.scss';

const ShoppingListTable: FunctionComponent = observer(() => {
    const { productAmountById, incrementProduct, decrementProduct, deleteProduct } = cartStore;
    const { products } = productStore;
    const flatProducts = Object.values(products ?? {}).reduce((accumulator, list) => [...accumulator, ...list]);

    const increment = (productId: string) => () => {
        incrementProduct(productId);
    };

    const decrement = (productId: string) => () => {
        decrementProduct(productId);
    };

    const handleDelete = (productId: string) => () => {
        deleteProduct(productId);
    };

    const totalListPrice = Object.entries(productAmountById).reduce((priceAccumulator, [id, amount]) => {
        const product = flatProducts.find((product) => product.id === id);
        if (!product) {
            return priceAccumulator;
        }

        return priceAccumulator + product.priceWithoutDiscount * amount;
    }, 0);

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

                {Object.entries(productAmountById).map(([id, amount], index) => {
                    const product = flatProducts.find((product) => product.id === id);

                    if (!product) {
                        return null;
                    }

                    const { name } = product;
                    const isLastInList = index === Object.values(productAmountById).length - 1;

                    return (
                        <div key={id} className={styles.rowWrapper}>
                            <div
                                className={classNames(styles.productRow, {
                                    [styles.roundedBottom]: isLastInList
                                })}
                            >
                                <div className={styles.cell}>{name}</div>

                                <div className={styles.cell}>x{amount}</div>

                                <div className={styles.cell}>
                                    <button type="button" className={styles.incrementButton} onClick={increment(id)}>
                                        +
                                    </button>
                                    <button type="button" className={styles.decrementButton} onClick={decrement(id)}>
                                        -
                                    </button>
                                </div>

                                <div className={styles.cell}>
                                    {(product.priceWithoutDiscount * amount).toFixed(1)} ₽
                                </div>
                            </div>

                            <button type="button" className={styles.deleteButton} onClick={handleDelete(id)}>
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
});

export default ShoppingListTable;
