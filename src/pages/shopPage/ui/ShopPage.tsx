import { reatomComponent, useAction, useAtom } from '@reatom/npm-react';
import { FunctionComponent } from 'react';
import { ProductCard } from '@/features/productCard';
import { cartStore } from '@/entities/cart';
import { productStore } from '@/entities/product';
import { Category, ProductOutDto } from '@/shared/api/apiTypes';
import chestImage from '@/shared/assets/chest.png';
import { Section, Spacing } from '@/shared/ui';
import { RunnerLoader } from '@/shared/ui/runnerLoader';
import { useFetchProducts } from './hooks/useFetchProducts';
import styles from './ShopPage.module.scss';

const pageSpacing = <Spacing size={50} sizeM={70} />;
const headerSpacing = <Spacing size={24} sizeM={32} />;

const ShopPage: FunctionComponent = reatomComponent(() => {
    const [productsByCategory] = useAtom(productStore.productsByCategory);
    const [productsById] = useAtom(productStore.productsById);
    const [productAmountById] = useAtom(cartStore.productAmountById);

    const incrementProduct = useAction(cartStore.incrementProduct);
    const decrementProduct = useAction(cartStore.decrementProduct);

    const { error, isLoading } = useFetchProducts(productsByCategory);

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (!productsByCategory || Object.values(productsById).length === 0 || error) {
        return (
            <div className={styles.errorWrapper}>
                {pageSpacing}

                <Section className={styles.errorSection}>
                    <img src={chestImage} className={styles.errorImage} alt="Нет товаров!" />
                    <h3 className={styles.errorSubheader}>Ой.</h3>
                    <p className={styles.errorDescription}>
                        В нашем магазине пока что нет товаров! Должно быть, произошла ошибка. <br />
                        Попробуйте заглянуть сюда позднее.
                    </p>
                </Section>

                {pageSpacing}
            </div>
        );
    }

    const renderProducts = (products: ProductOutDto[]) =>
        products.map((product) => {
            const handleIncrement = () => incrementProduct(product.id);
            const handleDecrement = () => decrementProduct(product.id);
            const amount = productAmountById[product.id] ?? 0;

            return (
                <ProductCard
                    key={product.id}
                    product={product}
                    amount={amount}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
            );
        });

    const rankProducts = productsByCategory[Category.RANKS];

    const otherProducts = Object.entries(productsByCategory)
        .filter(([category]) => category !== Category.RANKS)
        .map(([dummy, products]) => products)
        .flat();

    return (
        <div className={styles.wrapper}>
            {pageSpacing}

            <Section className={styles.section}>
                <h3 className={styles.category}>Ранги</h3>
                {headerSpacing}
                <div className={styles.cardsWrapper}>{renderProducts(rankProducts)}</div>

                {pageSpacing}

                <h3>Прочее разное</h3>
                {headerSpacing}
                <div className={styles.cardsWrapper}>{renderProducts(otherProducts)}</div>
            </Section>

            {pageSpacing}
        </div>
    );
});

export default ShopPage;
