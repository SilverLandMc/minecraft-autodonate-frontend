import { useAsync } from 'react-use';
import { ProductCategory } from '@/shared/enums/ProductCategory';
import { fetchAdminProductList } from '../../api/fetchAdminProductList';

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
