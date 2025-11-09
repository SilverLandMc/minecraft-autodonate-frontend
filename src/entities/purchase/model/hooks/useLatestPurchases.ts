import { useAsync } from 'react-use';
import { fetchLatestPurchases } from '../../api/fetchLatestPurchases';

// todo Исчез PageDto со стороны бэкенда, попинать бэкенд
export const useLatestPurchases = (pageParameters: any) => {
    const {
        loading: isLoading,
        value: purchaseInfo,
        error
    } = useAsync(async () => await fetchLatestPurchases(pageParameters), [pageParameters]);

    return { purchaseInfo, isLoading, error };
};
