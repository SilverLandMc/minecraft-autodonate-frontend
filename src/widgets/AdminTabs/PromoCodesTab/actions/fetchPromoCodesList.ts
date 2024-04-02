import { request } from 'shared/lib/request/request';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { PromocodeDto } from 'app/types/api/apiTypes';

const logger = createLogger('fetchPromoCodesList');

const fetchPromoCodesList = async () => {
    try {
        return await request<PromocodeDto[]>({ url: '/admin/promocode' });
    } catch (error) {
        const message = 'promoCodes: failed to fetch promoCodes list';
        Sentry.captureMessage(message, ({ setContext }) => setContext('error', { error }));
        logger.error(message);
        throw error;
    }
};

export default fetchPromoCodesList;
