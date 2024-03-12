import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';
import { CreatePaymentDto } from 'app/types/api/apiTypes';

const logger = createLogger('createPayment');

const createPayment = async (paymentInfo: CreatePaymentDto) => {
    try {
        return await post({
            url: `/public/payment`,
            data: paymentInfo
        });
    } catch (error) {
        logger.error(`createPayment: failed to create a payment. Error: ${error?.response?.data || error}`);
        throw error;
    }
};

export default createPayment;
