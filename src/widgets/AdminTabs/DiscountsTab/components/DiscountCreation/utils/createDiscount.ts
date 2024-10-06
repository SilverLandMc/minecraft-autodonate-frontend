import { DiscountBaseInDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';

const logger = createLogger('createDiscount');

const createDiscount = async (discount: DiscountBaseInDto) => {
    try {
        return await post({
            url: `/admin/discount`,
            data: discount
        });
    } catch (error) {
        const message = `createDiscount: failed to create a discount. Error: ${error?.response?.data || error}`;
        logger.error(message);
        Sentry.captureMessage(message);
        throw error;
    }
};

export default createDiscount;
