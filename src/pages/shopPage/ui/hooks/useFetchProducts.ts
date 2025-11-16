import { useAsync } from 'react-use';
import { AllProductsOutDto, productStore } from '@/entities/product';
import { fetchProducts } from '../../api/fetchProducts';

export const useFetchProducts = (productsByCategory?: AllProductsOutDto) => {
    const { loading: isLoading, error } = useAsync(async () => {
        if (productsByCategory) {
            return;
        }

        const products = await fetchProducts();
        productStore.setProducts(products);
    });

    return { isLoading, error };
};
