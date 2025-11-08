import { useSelector } from 'react-redux';
import { setAdmin, setUserRequestFinished } from '@/pages/adminPage/slices/adminPageSlice';
import useAppDispatch from '@/shared/hooks/redux/useAppDispatch';
import createLogger from '@/shared/lib/logger/logger';
import { request } from '@/shared/lib/request/request';
import selectAdminPagePart from '@/shared/redux/selectors/selectAdminPagePart';

const logger = createLogger('useAdminInfo');

const useAdminInfo = async () => {
    const dispatch = useAppDispatch();
    const { isUserRequestFinished } = useSelector(selectAdminPagePart);

    if (isUserRequestFinished) {
        return;
    }

    try {
        // todo Исправить после переезда авторизации на log / pass
        const { role, tgName, fullName } = await request<any>({
            url: '/admin/user/me'
        });

        // todo Исправить после переезда авторизации на log / pass
        if (role === 'admin') {
            dispatch(setAdmin());
        }

        logger.info(`Авторизован как ${fullName} (${tgName}) с ролью ${role}`);
    } catch (error) {
        logger.error('An error during an attempt to authorize');
    } finally {
        dispatch(setUserRequestFinished());
    }
};

export default useAdminInfo;
