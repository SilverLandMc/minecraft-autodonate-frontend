import { DiscountOutDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { request } from '@/shared/lib/request';

const logger = createLogger('fetchDiscountById');

export const fetchDiscountById = async (id: string) => {
    try {
        return await request<DiscountOutDto>({ url: `/public/discount/${id}` });
    } catch (error) {
        const message = 'fetchDiscountById: failed to fetch a discount';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};
