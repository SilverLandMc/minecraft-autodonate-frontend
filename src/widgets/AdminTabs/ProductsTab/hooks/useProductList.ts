import { useAsync } from 'react-use';
import fetchAdminProductList from '@/widgets/AdminTabs/ProductsTab/actions/fetchAdminProductList';
import { ProductCategory } from '@/shared/enums/ProductCategory';

interface Props {
    productCategory: ProductCategory;
    reFetchFlag?: boolean;
}

const useProductList = ({ productCategory, reFetchFlag }: Props) => {
    const {
        value: productList,
        loading: isLoading,
        error
    } = useAsync(async () => await fetchAdminProductList(productCategory), [productCategory, reFetchFlag]);

    return { productList, isLoading, error };
};

export default useProductList;
