import { Players } from 'app/types/api/apiTypes';
import { AppThunkAction } from 'app/types/redux';
import { setOnline } from 'pages/MainPage/slices/mainPageSlice';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

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
