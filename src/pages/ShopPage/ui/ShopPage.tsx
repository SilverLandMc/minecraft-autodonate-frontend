import React, { FunctionComponent, useEffect, useState } from 'react';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import Section from 'shared/ui/Section/Section';
import { useSelector } from 'react-redux';
import selectShopInfo from 'shared/redux/selectors/selectShopInfo';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import fetchProductsList from 'pages/ShopPage/utils/fetchProductsList';
import errorImage from './images/error.png';
import chestImage from 'shared/assets/chest.png';
import Spacing from 'shared/ui/spacing/Spacing';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import ProductCard from 'entities/ProductCard/ProductCard';
import styles from './ShopPage.module.scss';

interface Props {
    productCategory: ProductCategory;
}

const ShopPage: FunctionComponent<Props> = ({ productCategory }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const { productsByCategory, isCategoryLoaded, isFetchingFailed } = useSelector(selectShopInfo);
    const productsList = productsByCategory[productCategory] ?? [];

    useEffect(() => {
        if (isCategoryLoaded[productCategory]) {
            return;
        }

        const fetchProducts = async (productCategory: ProductCategory) => {
            try {
                setIsLoading(true);
                await dispatch(fetchProductsList(productCategory));
            } catch {
                // Ошибка обработана в fetchProductsList
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts(productCategory);
    }, [productCategory]);

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (isFetchingFailed) {
        return (
            <div className={styles.centeringErrorWrapper}>
                <Spacing size={15} sizeS={30} />

                <Section className={styles.errorSection}>
                    <img src={errorImage} className={styles.errorImage} alt="Произошла ошибка" />
                    <h3 className={styles.errorSubheader}>Упс.</h3>
                    <p className={styles.errorDescription}>
                        Произошла ошибка. <br /> Попробуйте перезагрузить страницу или приходите к нам позднее.
                    </p>
                </Section>

                <Spacing size={15} sizeS={30} />
            </div>
        );
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

export default ShopPage;
