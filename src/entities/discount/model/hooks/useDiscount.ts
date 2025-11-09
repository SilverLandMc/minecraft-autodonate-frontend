import { useAsync } from 'react-use';
import { fetchDiscountById } from '../../api/fetchDiscountById';

export const useDiscount = (id?: string) => {
    const {
        value: discount,
        loading: isLoading,
        error
    } = useAsync(async () => {
        if (!id) {
            return;
        }

        return await fetchDiscountById(id);
    }, [id]);

    return { discount, isLoading, error };
};
