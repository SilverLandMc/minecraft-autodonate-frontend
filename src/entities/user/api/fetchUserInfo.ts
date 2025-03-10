import { PlayerInfoOutDto } from '@/app/types/api/apiTypes';
import createLogger from '@/shared/lib/logger/logger';
import { request } from '@/shared/lib/request/request';

const logger = createLogger('fetchUserInfo');

export const fetchUserInfo = async (userNickName: string) => {
    try {
        return await request<PlayerInfoOutDto>({
            url: `/public/player/${userNickName}`
        });
    } catch (error) {
        // Здесь ответ 404 при несуществующем игроке является ожидаемым
        logger.info(`fetchOnlineInfo: failed to fetch. Error: ${error}`);
        throw error;
    }
};
