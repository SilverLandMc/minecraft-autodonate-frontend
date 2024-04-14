import { request } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { PromocodeOutDto } from 'app/types/api/apiTypes';

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
