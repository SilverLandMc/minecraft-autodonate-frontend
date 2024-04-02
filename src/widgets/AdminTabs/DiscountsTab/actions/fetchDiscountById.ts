import { request } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { DiscountOutDto } from 'app/types/api/apiTypes';

const logger = createLogger('fetchDiscountById');

const fetchDiscountById = async (id: string) => {
    try {
        return await request<DiscountOutDto>({ url: `/public/discount/${id}` });
    } catch (error) {
        const message = 'fetchDiscountById: failed to fetch a discount';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default fetchDiscountById;
