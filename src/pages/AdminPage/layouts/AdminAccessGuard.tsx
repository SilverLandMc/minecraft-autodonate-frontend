import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import selectShopPagePart from 'shared/redux/selectors/selectAdminPagePart';
import useAdminInfo from 'pages/AdminPage/hooks/useAdminInfo';
import styles from './AdminAccessGuard.module.scss';

const AdminAccessGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    useAdminInfo();
    const { isUserRequestFinished, isAdmin } = useSelector(selectShopPagePart);

    if (!isUserRequestFinished) {
        return null;
    }

    if (!isAdmin) {
        return <div className={styles.notFound}>Страница не найдена</div>;
    }

    return <>{children}</>;
};

export default AdminAccessGuard;
