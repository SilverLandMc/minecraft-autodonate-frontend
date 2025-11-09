import { useAsync } from 'react-use';
import { DiscountType } from '@/shared/api/apiTypes';
import { fetchDiscountsList } from '../../api/fetchDiscountsList';

const DISCOUNT_NAME_SLICE_LENGTH = 32;

export const useDiscountInfo = () => {
    const {
        value: rawDiscounts,
        error: discountInfoError,
        loading: isDiscountInfoLoading
    } = useAsync(async () => await fetchDiscountsList(), []);

    const actualDiscounts = rawDiscounts?.filter((discount) => !discount.isDeleted);
    const discountInfo = actualDiscounts?.map(({ id, name, discountType, discountAmount }) => {
        const description = `${name.slice(0, DISCOUNT_NAME_SLICE_LENGTH)}. ${discountAmount} ${discountType === DiscountType.PERCENTAGE ? '%' : '₽'}`;

        return { id, description };
    });

    return { discountInfo, isDiscountInfoLoading, discountInfoError };
};
