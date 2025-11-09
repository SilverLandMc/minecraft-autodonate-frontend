import { ProductCreateInDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { post } from '@/shared/lib/request';

const logger = createLogger('createProduct');

export const createProduct = async (product: ProductCreateInDto) => {
    try {
        return await post({
            url: `/admin/product`,
            data: product
        });
    } catch (error) {
        const message = `createProduct: failed to create a product. Error: ${error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};
