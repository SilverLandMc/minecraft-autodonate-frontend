import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';
import { request } from '@/shared/lib/request/request';

const logger = createLogger('fetchLatestPurchases');

// todo Исчез PageDto со стороны бэкенда, попинать бэкенд
export const fetchLatestPurchases = async (pageParameters: any) => {
    try {
        return await request<any>({
            url: '/admin/purchase/latest',
            params: { ...pageParameters }
        });
    } catch (error) {
        const message = `fetchLatestPurchases: failed to fetch.`;
        Sentry.captureMessage(message);
        logger.error(message);
    }
};
