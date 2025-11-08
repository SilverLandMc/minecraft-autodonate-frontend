import { useAsync } from 'react-use';
import fetchLatestPurchases from 'widgets/adminTabs/purchaseTab/components/LatestPurchases/utils/fetchLatestPurchases';
import { PageDto } from '@/shared/api/apiTypes';

const useLatestPurchases = (pageParameters: PageDto) => {
    const {
        loading: isLoading,
        value: purchaseInfo,
        error
    } = useAsync(async () => await fetchLatestPurchases(pageParameters), [pageParameters]);

    return { purchaseInfo, isLoading, error };
};

export default useLatestPurchases;
