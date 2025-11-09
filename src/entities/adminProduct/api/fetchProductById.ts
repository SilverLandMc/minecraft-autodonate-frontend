import { ProductOutDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { request } from '@/shared/lib/request';

const logger = createLogger('fetchProductById');

export const fetchProductById = async (productId: string) => {
    try {
        return await request<ProductOutDto>({ url: `/public/product/${productId}` });
    } catch (error) {
        const message = `fetchProductById: failed to fetch product with id ${productId}. Error: ${error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};
