import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { lowLevelRequest } from 'shared/lib/request/request';

const logger = createLogger('deletePromoCode');

const deletePromoCode = async (id: string) => {
    try {
        return await lowLevelRequest<boolean>({ url: `/admin/promocode/id/${id}`, method: 'DELETE' });
    } catch (error) {
        const message = 'deletePromoCode: failed to delete';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default deletePromoCode;
