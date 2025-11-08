import { useAsync } from 'react-use';
import fetchPromoCodeById from '@/widgets/adminTabs/promoCodeTab/actions/fetchPromoCodeById';

const usePromoCode = (promoCodeId: string) => {
    const {
        value: promoCode,
        loading: isLoading,
        error
    } = useAsync(async () => await fetchPromoCodeById(promoCodeId), []);

    return { promoCode, isLoading, error };
};

export default usePromoCode;
