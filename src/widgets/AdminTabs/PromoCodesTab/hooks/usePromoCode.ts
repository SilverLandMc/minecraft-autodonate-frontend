import { useAsync } from 'react-use';
import fetchPromoCodeById from 'widgets/AdminTabs/PromoCodesTab/actions/fetchPromoCodeById';

const usePromoCode = (promoCodeId: string) => {
    const {
        value: promoCode,
        loading: isLoading,
        error
    } = useAsync(async () => await fetchPromoCodeById(promoCodeId), []);

    return { promoCode, isLoading, error };
};

export default usePromoCode;
