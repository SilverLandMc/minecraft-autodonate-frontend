import { PromocodeInDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { post } from '@/shared/lib/request/request';

const logger = createLogger('createPromoCode');

export const createPromoCode = async (promoCode: PromocodeInDto) => {
    try {
        return await post({
            url: `/admin/promocode`,
            data: promoCode
        });
    } catch (error) {
        const message = `createPromoCode: failed to create a promocode. Error: ${error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};
