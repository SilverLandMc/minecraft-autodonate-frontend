import { request } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { DiscountOutDto } from 'app/types/api/apiTypes';

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
