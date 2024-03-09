import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';
import { PromocodeOutDto } from 'app/types/api/apiTypes';

const logger = createLogger('fetchPromoCodeByName');

const fetchPromoCodeByName = async (promoCodeName: string) => {
    try {
        return await request<PromocodeOutDto>({
            url: `/public/prodmocode/${promoCodeName}`
        });
    } catch (error) {
        logger.error(`fetchPromoCodeByName: failed to fetch. Error: ${error?.response?.data || error}`);
        throw error;
    }
};

export default fetchPromoCodeByName;
