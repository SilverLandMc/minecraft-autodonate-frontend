import { useAction } from '@reatom/npm-react';
import { useAsync } from 'react-use';
import { AllProductsOutDto, productStore } from '@/entities/product';
import { fetchProducts } from '../../api/fetchProducts';

export const useFetchProducts = (productsByCategory?: AllProductsOutDto) => {
    const handleSetProducts = useAction(productStore.setProducts);

    const { loading: isLoading, error } = useAsync(async () => {
        if (productsByCategory) {
            return;
        }

        const products = await fetchProducts();
        handleSetProducts(products);
    }, [productsByCategory]);

    return { isLoading, error };
};
