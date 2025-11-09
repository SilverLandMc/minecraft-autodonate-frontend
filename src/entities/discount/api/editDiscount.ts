import { DiscountInDto, DiscountOutDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { put } from '@/shared/lib/request';

const logger = createLogger('editDiscount');

export const editDiscount = async (discount: DiscountInDto) => {
    try {
        return await put<DiscountOutDto[]>({ url: '/admin/discount', data: discount });
    } catch (error) {
        const message = `editDiscount: failed to edit a discount with id ${discount.id}`;
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};
