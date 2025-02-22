import { Players } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchOnlineInfo');

export const fetchOnlineInfo = async () => {
    try {
        return await request<Players>({
            url: '/public/online'
        });
    } catch (error) {
        logger.error('fetchOnlineInfo: failed to fetch.');
        Sentry.captureException(error);
        throw error;
    }
};
