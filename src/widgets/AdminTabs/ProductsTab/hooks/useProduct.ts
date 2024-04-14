import { useAsync } from 'react-use';
import fetchProductById from 'widgets/AdminTabs/ProductsTab/actions/fetchProductById';

const useProduct = (productId: string) => {
    const { value: product, loading: isLoading, error } = useAsync(async () => await fetchProductById(productId), []);

    return { product, isLoading, error };
};

export default useProduct;
