import { PurchaseTopProductsOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchPurchases');

const fetchPurchases = async () => {
    try {
        const totalPurchases = await request<number>({ url: '/admin/purchase/total' });
        const topPurchases = await request<PurchaseTopProductsOutDto[]>({ url: '/admin/purchase/top' });

        return {
            totalPurchases,
            topPurchases
        };
    } catch (error) {
        const message = 'fetchPurchases: failed to fetch';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
    }
};

export default fetchPurchases;
