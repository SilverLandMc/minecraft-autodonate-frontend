import { AppThunkAction } from 'app/types/redux';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { request } from 'shared/lib/request/request';
import { setOnline } from 'pages/MainPage/slices/mainPageSlice';
import { Players } from 'app/types/api/apiTypes';

const logger = createLogger('fetchOnlineInfo');

const fetchOnlineInfo = (): AppThunkAction => async (dispatch) => {
    try {
        const online = await request<Players>({
            url: '/public/online'
        });
        dispatch(setOnline(online));
    } catch (error) {
        logger.error(`fetchOnlineInfo: failed to fetch. Error: ${error?.response?.data || error}`);
        Sentry.captureException(error);
        throw error;
    }
};

export default fetchOnlineInfo;
