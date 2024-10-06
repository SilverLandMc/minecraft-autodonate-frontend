import { PromocodeOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchPromoCodeById');

const fetchPromoCodeById = async (id: string) => {
    try {
        return await request<PromocodeOutDto>({ url: `/public/promocode/id/${id}` });
    } catch (error) {
        const message = 'fetchDiscountById: failed to fetch a promocode';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default fetchPromoCodeById;
