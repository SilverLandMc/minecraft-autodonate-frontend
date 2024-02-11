import { AppThunkAction } from 'app/types/redux';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { request } from 'shared/lib/request/request';
import { ProductOutDto } from 'app/types/api/apiTypes';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import { setFetchingFailed, setProducts } from 'pages/ShopPage/slices/shopPageSlice';

const logger = createLogger('fetchProductsList');

const fetchProductsList =
    (productCategory: ProductCategory): AppThunkAction =>
    async (dispatch) => {
        try {
            const products = await request<ProductOutDto[]>({
                url: `/public/product/category/${productCategory}`
            });
            dispatch(setProducts({ products, productCategory }));
        } catch (error) {
            dispatch(setFetchingFailed());
            logger.error(`fetchProductsList: failed to fetch. Error: ${error?.response?.data || error}`);
            Sentry.captureException(error);
        }
    };

export default fetchProductsList;
