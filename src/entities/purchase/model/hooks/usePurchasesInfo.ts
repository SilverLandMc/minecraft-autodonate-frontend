import { useAsync } from 'react-use';
import { fetchPurchases } from '../../api/fetchPurchases';

export const usePurchasesInfo = () => {
    const { value: purchaseInfo, loading: isLoading, error } = useAsync(async () => await fetchPurchases(), []);

    return { purchaseInfo, isLoading, error };
};
