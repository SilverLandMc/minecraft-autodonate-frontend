import { lowLevelRequest } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';

const logger = createLogger('deleteDiscount');

const deleteDiscount = async (id: string) => {
    try {
        return await lowLevelRequest<boolean>({ url: `/admin/discount/${id}`, method: 'DELETE' });
    } catch (error) {
        const message = 'deleteDiscount: failed to delete';
        Sentry.captureMessage(message);
        logger.error(message);
        throw error;
    }
};

export default deleteDiscount;
