import { productStore } from 'entities/product';
import minusIcon from 'entities/product/ui/productCard/images/minusIcon.svg';
import plusIcon from 'entities/product/ui/productCard/images/plusIcon.svg';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { BackgroundColor, ModernButton, Spacing } from 'shared/ui';
import { ProductsById } from '@/app/types/api/apiTypesHelper';
import { cartStore } from '@/entities/cart';
import styles from './ShoppingListTable.module.scss';

interface Props {
    productsById: ProductsById;
}

export const ShoppingListTable: FunctionComponent<Props> = observer(() => {
    const { productAmountById, incrementProduct, decrementProduct } = cartStore;
    // todo Отказаться от использования productStore напрямую и перейти к использованию пропса, сейчас с пропсом странный баг, когда productsById === undefined
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
                <span className={styles.totalListPriceDescription}>Итого: </span>
                {totalListPrice.toFixed(1)} ₽
            </div>
        </div>
    );
});
