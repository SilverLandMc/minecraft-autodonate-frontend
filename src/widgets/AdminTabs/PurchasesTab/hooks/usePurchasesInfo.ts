import fetchPurchases from 'widgets/AdminTabs/PurchasesTab/utils/fetchPurchases';
import { useAsync } from 'react-use';

const usePurchasesInfo = () => {
    const { value: purchaseInfo, loading: isLoading, error } = useAsync(async () => await fetchPurchases(), []);

    return { purchaseInfo, isLoading, error };
};

export default usePurchasesInfo;
