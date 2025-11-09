import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { lowLevelRequest } from '@/shared/lib/request';

const logger = createLogger('deletePromoCode');

export const deletePromoCode = async (id: string) => {
    try {
        return await lowLevelRequest<boolean>({ url: `/admin/promocode/id/${id}`, method: 'DELETE' });
    } catch (error) {
        const message = 'deletePromoCode: failed to delete';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};
