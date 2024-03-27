import { useEffect, useState } from 'react';
import { DiscountOutDto } from 'app/types/api/apiTypes';
import fetchDiscountsList from 'widgets/AdminTabs/DiscountsTab/utils/fetchDiscountsList';

const useDiscountsList = (reFetchListFlag: boolean) => {
    const [discountsList, setDiscountsList] = useState<DiscountOutDto[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPurchases = async () => {
            try {
                setIsLoading(true);
                const data = await fetchDiscountsList();
                setDiscountsList(data);
            } catch (error) {
                setError('Ошибка при загрузке покупок');
            } finally {
                setIsLoading(false);
            }
        };

        loadPurchases();
    }, [reFetchListFlag]);

    return { discountsList, isLoading, error };
};

export default useDiscountsList;
