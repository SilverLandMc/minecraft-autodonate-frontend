import { useAsync } from 'react-use';
import fetchDiscountsList from 'widgets/adminTabs/discountTab/actions/fetchDiscountsList';
import { DiscountType } from '@/shared/api/apiTypes';

const DISCOUNT_NAME_SLICE_LENGTH = 32;

const useDiscountInfo = () => {
    const {
        value: rawDiscounts,
        error: discountInfoError,
        loading: isDiscountInfoLoading
    } = useAsync(async () => await fetchDiscountsList(), []);

    const actualDiscounts = rawDiscounts?.filter((discount) => !discount.deleted);
    const discountInfo = actualDiscounts?.map(({ id, name, discountType, discountAmount }) => {
        const description = `${name.slice(0, DISCOUNT_NAME_SLICE_LENGTH)}. ${discountAmount} ${discountType === DiscountType.PERCENTAGE ? '%' : '₽'}`;

        return { id, description };
    });

    return { discountInfo, isDiscountInfoLoading, discountInfoError };
};

export default useDiscountInfo;
