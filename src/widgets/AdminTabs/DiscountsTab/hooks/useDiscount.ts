import { useAsync } from 'react-use';
import fetchDiscountById from 'widgets/AdminTabs/DiscountsTab/actions/fetchDiscountById';

const useDiscount = (id: string) => {
    const { value: discount, loading: isLoading, error } = useAsync(async () => await fetchDiscountById(id), [id]);

    return { discount, isLoading, error };
};

export default useDiscount;
