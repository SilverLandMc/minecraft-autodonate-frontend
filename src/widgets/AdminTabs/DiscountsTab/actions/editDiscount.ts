import { put } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { DiscountInDto, DiscountOutDto } from 'app/types/api/apiTypes';

const logger = createLogger('editDiscount');

const editDiscount = async (discount: DiscountInDto) => {
    try {
        return await put<DiscountOutDto[]>({ url: '/admin/discount', data: discount });
    } catch (error) {
        const message = `editDiscount: failed to edit a discount with id ${discount.id}`;
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default editDiscount;
