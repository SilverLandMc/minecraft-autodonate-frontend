import { PromocodeOutDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { request } from '@/shared/lib/request/request';

const logger = createLogger('fetchPromoCodeByName');

export const fetchPromoCodeByName = async (name: string) => {
    try {
        return await request<PromocodeOutDto>({ url: `/public/promocode/${name}` });
    } catch (error) {
        const message = 'fetchDiscountById: failed to fetch a promocode';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};
