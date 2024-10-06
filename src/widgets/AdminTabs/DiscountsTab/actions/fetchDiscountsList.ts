import { DiscountOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchDiscountsList');

const fetchDiscountsList = async () => {
    try {
        return await request<DiscountOutDto[]>({ url: '/admin/discount' });
    } catch (error) {
        const message = 'discounts: failed to fetch discounts list';
        Sentry.captureMessage(message);
        logger.error(message);
        throw error;
    }
};

export default fetchDiscountsList;
