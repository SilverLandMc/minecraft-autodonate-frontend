import { ProductEditInDto, ProductOutDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { put } from '@/shared/lib/request/request';

const logger = createLogger('editProduct');

export const editProduct = async (product: ProductEditInDto) => {
    try {
        return await put<ProductOutDto>({ url: '/admin/product', data: product });
    } catch (error) {
        const message = `editProduct: failed to edit a product "${product.name}" (ID ${product.id})`;
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};
