import { ProductCategory } from 'app/const/enum/ProductCategory';
import ShopPagePure from 'pages/ShopPage/ui/ShopPagePure';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import fetchProductsList from 'shared/lib/actions/fetchProductsList';
import selectShopInfo from 'shared/redux/selectors/selectShopInfo';

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

    if (isFetchingFailed) {
        throw new Error('Failed to fetch');
    }

    return <ShopPagePure productsList={productsList} loading={isLoading} />;
};

export default ShopPage;
