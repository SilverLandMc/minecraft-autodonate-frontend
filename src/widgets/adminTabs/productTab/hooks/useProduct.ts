import { useAsync } from 'react-use';
import { fetchProductById } from 'widgets/adminTabs/productTab/actions/fetchProductById';

export const useProduct = (productId?: string) => {
    const {
        value: product,
        loading: isLoading,
        error
    } = useAsync(async () => {
        if (!productId) {
            return;
        }

        return await fetchProductById(productId);
    }, []);

    return { product, isLoading, error };
};
