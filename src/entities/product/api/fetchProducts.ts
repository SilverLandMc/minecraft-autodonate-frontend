import createLogger from '@/shared/lib/logger/logger';
import { request } from '@/shared/lib/request/request';
import { AllProductsOutDto } from '../types';

const logger = createLogger('fetchProducts');

export const fetchProducts = async () => {
    try {
        return await request<AllProductsOutDto>({
            url: '/public/product/all'
        });
    } catch (error) {
        logger.error(`fetchOnlineInfo: failed to fetch. Error: ${error}`);
    }
};
