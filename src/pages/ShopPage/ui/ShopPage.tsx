import { ProductCategory } from 'app/const/enum/ProductCategory';
import ProductCard from 'entities/ProductCard/ProductCard';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import chestImage from 'shared/assets/chest.png';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import fetchProductsList from 'shared/lib/actions/fetchProductsList';
import selectShopInfo from 'shared/redux/selectors/selectShopInfo';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
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
    }, [productCategory, dispatch, isCategoryLoaded]);

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (isFetchingFailed) {
        throw new Error('Failed to fetch');
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
