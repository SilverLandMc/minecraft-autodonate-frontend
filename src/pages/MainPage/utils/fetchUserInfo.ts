import { AppThunkAction } from 'app/types/redux';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { request } from 'shared/lib/request/request';
import { setUserInfo } from 'pages/MainPage/slices/mainPageSlice';
import { PlayerInfoOutDto } from 'app/types/api/apiTypes';

const logger = createLogger('fetchUserNickname');

const fetchUserInfo =
    (userNickName: string): AppThunkAction =>
    async (dispatch) => {
        try {
            const playerInfo = await request<PlayerInfoOutDto>({
                url: `/public/player/${userNickName}`
            });
            dispatch(setUserInfo(playerInfo));
        } catch (error) {
            logger.error(`fetchOnlineInfo: failed to fetch. Error: ${error?.response?.data || error}`);
            Sentry.captureException(error);
            throw error;
        }
    };

export default fetchUserInfo;
