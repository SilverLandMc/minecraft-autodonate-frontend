import { PageDto } from 'app/types/api/apiTypes';
import { useAsync } from 'react-use';
import fetchLatestPurchases from 'widgets/AdminTabs/PurchasesTab/components/LatestPurchases/utils/fetchLatestPurchases';

const useLatestPurchases = (pageParameters: PageDto) => {
    const {
        loading: isLoading,
        value: purchaseInfo,
        error
    } = useAsync(async () => await fetchLatestPurchases(pageParameters), [pageParameters]);

    return { purchaseInfo, isLoading, error };
};

export default useLatestPurchases;
