import React, { FunctionComponent } from 'react';
import { ProductOutDto } from 'app/types/api/apiTypes';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import styles from 'pages/ShopPage/ui/ShopPage.module.scss';
import Spacing from 'shared/ui/spacing/Spacing';
import Section from 'shared/ui/Section/Section';
import chestImage from 'shared/assets/chest.png';
import ProductCard from 'entities/ProductCard/ProductCard';

interface Props {
    productsList: ProductOutDto[];
    loading?: boolean;
}

const ShopPagePure: FunctionComponent<Props> = ({ productsList, loading: isLoading }) => {
    if (isLoading) {
        return <RunnerLoader />;
    }

    if (!productsList || productsList.length === 0) {
        return (
            <div className={styles.centeringErrorWrapper}>
                <Spacing size={15} sizeS={30} />

                <Section className={styles.errorSection}>
                    <img src={chestImage} className={styles.errorImage} alt="Нет товаров!" />
                    <h3 className={styles.errorSubheader}>Ой.</h3>
                    <p className={styles.errorDescription}>
                        В этой категории пока что нет товаров! <br /> Посмотрите товары других категорий или загляните
                        сюда позднее.
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
                    {productsList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Section>

            <Spacing size={15} sizeM={20} />
        </div>
    );
};

export default ShopPagePure;
