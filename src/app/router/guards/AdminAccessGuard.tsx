import useAdminInfo from 'pages/adminPage/hooks/useAdminInfo';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import selectAdminPagePart from 'shared/redux/selectors/selectAdminPagePart';
import RunnerLoader from 'shared/ui/runnerLoader/RunnerLoader';

export const AdminAccessGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    useAdminInfo();
    const { isUserRequestFinished, isAdmin } = useSelector(selectAdminPagePart);

    if (!isUserRequestFinished) {
        return <RunnerLoader />;
    }

    if (!isAdmin) {
        return <Navigate to={AppRoutes.NOT_FOUND} />;
    }

    return <>{children}</>;
};
