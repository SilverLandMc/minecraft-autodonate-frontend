import { PromocodeInDto, PromocodeOutDto } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { put } from '@/shared/lib/request/request';

const logger = createLogger('editPromoCode');

export const editPromoCode = async (promoCode: PromocodeInDto) => {
    try {
        return await put<PromocodeOutDto[]>({ url: '/admin/promocode', data: promoCode });
    } catch (error) {
        const message = `editPromoCode: failed to edit a promocode with name ${promoCode.name}`;
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};
