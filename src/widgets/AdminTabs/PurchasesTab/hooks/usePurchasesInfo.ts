import { useState, useEffect } from 'react';
import fetchPurchases from 'widgets/AdminTabs/PurchasesTab/utils/fetchPurchases';
import { PurchaseTopProductsOutDto } from 'app/types/api/apiTypes';

interface PurchaseInfo {
    totalPurchases: number;
    topPurchases: PurchaseTopProductsOutDto[];
}

const usePurchasesInfo = () => {
    const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPurchases = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPurchases();
                setPurchaseInfo(data);
            } catch (error) {
                setError('Ошибка при загрузке покупок');
            } finally {
                setIsLoading(false);
            }
        };

        loadPurchases();
    }, []);

    return { purchaseInfo, isLoading, error };
};

export default usePurchasesInfo;
