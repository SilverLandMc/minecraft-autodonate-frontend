import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';
import { CreatePaymentDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';

const logger = createLogger('createPayment');

const createPaymentLink = async (paymentInfo: CreatePaymentDto) => {
    try {
        return await post<string>({
            url: `/public/payment`,
            data: paymentInfo
        });
    } catch (error) {
        const message = `createPayment: failed to create a payment. Error: ${error?.response?.data || error}`;
        logger.error(message);
        Sentry.captureMessage(message);
        throw error;
    }
};

export default createPaymentLink;
