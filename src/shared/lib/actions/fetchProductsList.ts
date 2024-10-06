import { ProductCategory } from 'app/const/enum/ProductCategory';
import { ProductOutDto } from 'app/types/api/apiTypes';
import { AppThunkAction } from 'app/types/redux';
import { setFetchingFailed, setProducts } from 'pages/ShopPage/slices/shopPageSlice';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

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
            const message = `fetchProductsList: failed to fetch. Error: ${error?.response?.data || error}`;
            logger.error(message);
            Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        }
    };

export default fetchProductsList;
