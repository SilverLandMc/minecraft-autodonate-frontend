import { AppThunkAction } from 'app/types/redux';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';
import { request } from 'shared/lib/request/request';
import { OnlineDto } from 'app/types/api/apiTypesHelper';
import { setOnline } from 'pages/MainPage/slices/mainPageSlice';

const logger = createLogger('fetchPublishedCourses');

const fetchOnlineInfo = (): AppThunkAction => async (dispatch) => {
    try {
        const online = await request<OnlineDto>({
            url: '/public/online'
        });
        dispatch(setOnline(online));
        return online;
    } catch (error) {
        logger.error(`fetchOnlineInfo: failed to fetch. Error: ${error?.response?.data || error}`);
        Sentry.captureException(error);
        throw error;
    }
};

export default fetchOnlineInfo;
