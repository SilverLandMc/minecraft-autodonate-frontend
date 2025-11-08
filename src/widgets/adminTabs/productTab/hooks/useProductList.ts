import { useAsync } from 'react-use';
import fetchAdminProductList from '@/widgets/adminTabs/productTab/actions/fetchAdminProductList';
import { ProductCategory } from '@/shared/enums/ProductCategory';

interface Props {
    productCategory: ProductCategory;
    reFetchFlag?: boolean;
}

export const useProductList = ({ productCategory, reFetchFlag }: Props) => {
    const {
        value: productList,
        loading: isLoading,
        error
    } = useAsync(async () => await fetchAdminProductList(productCategory), [productCategory, reFetchFlag]);

    return { productList, isLoading, error };
};
