import useAdminInfo from 'pages/adminPage/hooks/useAdminInfo';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import selectAdminPagePart from 'shared/redux/selectors/selectAdminPagePart';
import RunnerLoader from 'shared/ui/runnerLoader/RunnerLoader';
import { NotFoundPage } from '../../notFoundPage';

const AdminAccessGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    useAdminInfo();
    const { isUserRequestFinished, isAdmin } = useSelector(selectAdminPagePart);

    if (!isUserRequestFinished) {
        return <RunnerLoader />;
    }

    if (!isAdmin) {
        return <NotFoundPage />;
    }

    return <>{children}</>;
};

export default AdminAccessGuard;
