import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { cartStore } from '@/entities/cart';
import { productStore } from '@/entities/product';
import minusIcon from '@/shared/assets/minusIcon.svg';
import plusIcon from '@/shared/assets/plusIcon.svg';
import { BackgroundColor, ModernButton, Spacing } from '@/shared/ui';
import styles from './ShoppingListTable.module.scss';

export const ShoppingListTable: FunctionComponent = observer(() => {
    const { productAmountById, incrementProduct, decrementProduct } = cartStore;
    const { productsById } = productStore;

    const increment = (productId: string) => () => incrementProduct(productId);
    const decrement = (productId: string) => () => decrementProduct(productId);

    const totalListPrice = Object.entries(productAmountById).reduce((priceAccumulator, [id, amount]) => {
        const product = productsById?.[id];
        return priceAccumulator + product.priceWithoutDiscount * amount;
    }, 0);

    return (
        <div className={styles.list}>
            {Object.entries(productAmountById).map(([id, amount]) => {
                const product = productsById[id];

                const { name } = product;

                return (
                    <div key={id} className={styles.card}>
                        <div className={styles.name}>{name}</div>

                        <div className={styles.controlsPriceRow}>
                            <div className={styles.amountControlRow}>
                                <ModernButton
                                    className={styles.amountControlButton}
                                    background={BackgroundColor.RED}
                                    onClick={decrement(id)}
                                >
                                    <img src={minusIcon} alt="Убрать" />
                                </ModernButton>

                                <span className={styles.amount}>{amount}</span>

                                <ModernButton
                                    className={styles.amountControlButton}
                                    background={BackgroundColor.RED}
                                    onClick={increment(id)}
                                >
                                    <img src={plusIcon} alt="Добавить" />
                                </ModernButton>
                            </div>

                            <div className={styles.cell}>{(product.priceWithoutDiscount * amount).toFixed(1)} руб.</div>
                        </div>
                    </div>
                );
            })}

            <Spacing size={20} />

            <div className={styles.totalListPrice}>
                <span className={styles.totalListPriceDescription}>Итого:</span>
                {totalListPrice.toFixed(1)} ₽
            </div>
        </div>
    );
});
