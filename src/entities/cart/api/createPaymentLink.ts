import { CreatePaymentDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';

const logger = createLogger('createPayment');

export const createPaymentLink = async (paymentInfo: CreatePaymentDto) => {
    try {
        return await post<string>({
            url: `/public/payment`,
            data: paymentInfo
        });
    } catch (error) {
        const message = `createPayment: failed to create a payment. Error: ${error}`;
        logger.error(message);
        Sentry.captureMessage(message);
        throw error;
    }
};
