import { ProductCreateInDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';

const logger = createLogger('createProduct');

const createProduct = async (product: ProductCreateInDto) => {
    try {
        return await post({
            url: `/admin/product`,
            data: product
        });
    } catch (error) {
        const message = `createProduct: failed to create a product. Error: ${error?.response?.message || error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};

export default createProduct;
