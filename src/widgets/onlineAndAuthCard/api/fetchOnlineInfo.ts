import { ServerInfo } from '@/shared/api/apiTypes';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { request } from '@/shared/lib/request/request';

const logger = createLogger('fetchOnlineInfo');

export const fetchOnline = async () => {
    try {
        return await request<ServerInfo>({
            url: '/public/online'
        });
    } catch (error) {
        logger.error('fetchOnlineInfo: failed to fetch.');
        Sentry.captureException(error);
        throw error;
    }
};
