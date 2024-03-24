import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import selectAdminPagePart from 'shared/redux/selectors/selectAdminPagePart';
import useAdminInfo from 'pages/AdminPage/hooks/useAdminInfo';
import styles from './AdminAccessGuard.module.scss';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';

const AdminAccessGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    useAdminInfo();
    const { isUserRequestFinished, isAdmin } = useSelector(selectAdminPagePart);

    if (!isUserRequestFinished) {
        return <RunnerLoader />;
    }

    if (!isAdmin) {
        return <div className={styles.notFound}>Страница не найдена</div>;
    }

    return <>{children}</>;
};

export default AdminAccessGuard;
