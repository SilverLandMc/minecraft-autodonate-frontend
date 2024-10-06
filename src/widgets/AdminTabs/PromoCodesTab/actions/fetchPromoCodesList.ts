import { PromocodeOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchPromoCodesList');

const fetchPromoCodesList = async () => {
    try {
        return await request<PromocodeOutDto[]>({ url: '/admin/promocode/all' });
    } catch (error) {
        const message = 'promoCodes: failed to fetch promoCodes list';
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default fetchPromoCodesList;
