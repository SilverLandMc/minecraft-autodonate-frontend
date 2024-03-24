import { useEffect, useState } from 'react';
import { PageDto, PagePaymentOutDto } from 'app/types/api/apiTypes';
import fetchLatestPurchases from 'widgets/AdminTabs/PurchasesTab/components/LatestPurchases/utils/fetchLatestPurchases';

const useLatestPurchases = (pageParameters: PageDto) => {
    const [purchaseInfo, setPurchaseInfo] = useState<PagePaymentOutDto>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLatestPurchases = async () => {
            try {
                setIsLoading(true);
                const data = await fetchLatestPurchases(pageParameters);
                setPurchaseInfo(data);
            } catch (error) {
                setError('Ошибка при загрузке списка последних покупок');
            } finally {
                setIsLoading(false);
            }
        };

        loadLatestPurchases();
    }, [pageParameters]);

    return { purchaseInfo, isLoading, error };
};

export default useLatestPurchases;
