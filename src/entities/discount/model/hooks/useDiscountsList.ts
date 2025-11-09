import { useAsync } from 'react-use';
import { fetchDiscountsList } from '../../api/fetchDiscountsList';

interface Props {
    reFetchListFlag?: boolean;
    isOnlyActualMode?: boolean;
}

export const useDiscountsList = ({ reFetchListFlag, isOnlyActualMode }: Props) => {
    const { value, error, loading: isLoading } = useAsync(async () => await fetchDiscountsList(), [reFetchListFlag]);
    const discountsList = isOnlyActualMode ? value?.filter((discount) => !discount.isDeleted) : value;

    return { discountsList, isLoading, error };
};
