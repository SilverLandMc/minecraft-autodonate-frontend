import { productStore } from 'entities/product';
import ProductCard from 'entities/ProductCard/ProductCard';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import chestImage from 'shared/assets/chest.png';
import RunnerLoader from 'shared/ui/runnerLoader/RunnerLoader';
import Section from 'shared/ui/section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import styles from './ShopPagePure.module.scss';

const ShopPagePure: FunctionComponent = observer(() => {
    const { isProductsFetching, products } = productStore;

    if (isProductsFetching) {
        return <RunnerLoader />;
    }

    if (!products || Object.values(products).every((productList) => productList.length === 0)) {
        return (
            <div className={styles.errorWrapper}>
                <Spacing size={15} sizeS={30} />

                <Section className={styles.errorSection}>
                    <img src={chestImage} className={styles.errorImage} alt="Нет товаров!" />
                    <h3 className={styles.errorSubheader}>Ой.</h3>
                    <p className={styles.errorDescription}>
                        В нашем магазине пока что нет товаров! Должно быть, произошла ошибка. <br />
                        Попробуйте заглянуть сюда позднее.
                    </p>
                </Section>

                <Spacing size={15} sizeS={30} />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Spacing size={15} sizeM={20} />

            <Section className={styles.section}>
                <div className={styles.cardsWrapper}>
                    {Object.values(products).map((category) =>
                        category.map((product) => <ProductCard key={product.id} product={product} />)
                    )}
                </div>
            </Section>

            <Spacing size={15} sizeM={20} />
        </div>
    );
});

export default ShopPagePure;
