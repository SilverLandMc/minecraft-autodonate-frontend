import { request } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import { ProductOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';

const logger = createLogger('fetchProductById');

const fetchProductById = async (productId: string) => {
    try {
        return await request<ProductOutDto>({ url: `/public/product/${productId}` });
    } catch (error) {
        const message = `fetchProductById: failed to fetch product with id ${productId}. Error: ${error?.message || error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};

export default fetchProductById;
