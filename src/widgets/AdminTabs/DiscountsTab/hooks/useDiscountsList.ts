import fetchDiscountsList from 'widgets/AdminTabs/DiscountsTab/actions/fetchDiscountsList';
import { useAsync } from 'react-use';

const useDiscountsList = (reFetchListFlag: boolean, isOnlyActualMode: boolean) => {
    const { value, error, loading: isLoading } = useAsync(async () => await fetchDiscountsList(), [reFetchListFlag]);
    const discountsList = isOnlyActualMode ? value.filter((discount) => !discount.deleted) : value;

    return { discountsList, isLoading, error };
};

export default useDiscountsList;
