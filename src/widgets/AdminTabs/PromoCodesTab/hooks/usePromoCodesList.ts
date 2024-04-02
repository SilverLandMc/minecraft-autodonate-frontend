import { useAsync } from 'react-use';
import fetchPromoCodesList from 'widgets/AdminTabs/PromoCodesTab/actions/fetchPromoCodesList';

const usePromoCodesList = () => {
    const { value: promoCodesList, loading: isLoading, error } = useAsync(async () => await fetchPromoCodesList(), []);

    return { promoCodesList, isLoading, error };
};

export default usePromoCodesList;
