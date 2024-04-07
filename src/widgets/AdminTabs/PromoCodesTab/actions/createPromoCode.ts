import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';
import { PromocodeInDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';

const logger = createLogger('createPromoCode');

const createPromoCode = async (promoCode: PromocodeInDto) => {
    try {
        return await post({
            url: `/admin/promocode`,
            data: promoCode
        });
    } catch (error) {
        const message = `createPromoCode: failed to create a promocode. Error: ${error?.response?.message || error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};

export default createPromoCode;
