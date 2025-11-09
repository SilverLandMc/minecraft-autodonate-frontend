import { AllProductsOutDto } from '@/entities/product';
import { createLogger } from '@/shared/lib/logger';
import { request } from '@/shared/lib/request';

const logger = createLogger('fetchProducts');

export const fetchProducts = async () => {
    try {
        return await request<AllProductsOutDto>({
            url: '/public/product/all'
        });
    } catch (error) {
        logger.error(`fetchOnlineInfo: failed to fetch. Error: ${error}`);
        throw error;
    }
};
