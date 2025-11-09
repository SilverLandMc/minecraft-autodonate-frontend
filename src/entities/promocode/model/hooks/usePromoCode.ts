import { useAsync } from 'react-use';
import { fetchPromoCodeById } from '../../api/fetchPromoCodeById';

export const usePromoCode = (promoCodeId?: string) => {
    const {
        value: promoCode,
        loading: isLoading,
        error
    } = useAsync(async () => {
        if (!promoCodeId) {
            return;
        }

        return await fetchPromoCodeById(promoCodeId);
    }, []);

    return { promoCode, isLoading, error };
};
