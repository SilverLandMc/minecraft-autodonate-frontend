import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { useSelector } from 'react-redux';
import selectAdminPagePart from 'shared/redux/selectors/selectAdminPagePart';
import { request } from 'shared/lib/request/request';
import { AuthUserDto, Role } from 'app/types/api/apiTypes';
import { setAdmin, setUserRequestFinished } from 'pages/AdminPage/slices/adminPageSlice';
import createLogger from 'shared/lib/logger/logger';

const logger = createLogger('useAdminInfo');

const useAdminInfo = async () => {
    const dispatch = useAppDispatch();
    const { isUserRequestFinished } = useSelector(selectAdminPagePart);

    if (isUserRequestFinished) {
        return;
    }

    try {
        const { role, tgName, fullName } = await request<AuthUserDto>({
            url: '/admin/user/me'
        });

        if (role === Role.ADMIN) {
            dispatch(setAdmin());
        }

        logger.info(`Авторизован как ${fullName} (${tgName}) с ролью ${role}`);
    } catch (error) {
        logger.error(error);
    } finally {
        dispatch(setUserRequestFinished());
    }
};

export default useAdminInfo;
