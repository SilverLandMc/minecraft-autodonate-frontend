import { lowLevelRequest } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';

const logger = createLogger('deletePromoCode');

const deletePromoCode = async (name: string) => {
    try {
        return await lowLevelRequest<boolean>({ url: `/admin/promocode/${name}`, method: 'DELETE' });
    } catch (error) {
        const message = 'deletePromoCode: failed to delete';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default deletePromoCode;
