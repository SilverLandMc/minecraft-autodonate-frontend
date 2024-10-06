import { useAsync } from 'react-use';
import fetchPurchases from 'widgets/AdminTabs/PurchasesTab/utils/fetchPurchases';

const usePurchasesInfo = () => {
    const { value: purchaseInfo, loading: isLoading, error } = useAsync(async () => await fetchPurchases(), []);

    return { purchaseInfo, isLoading, error };
};

export default usePurchasesInfo;
