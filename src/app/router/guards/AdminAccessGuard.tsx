import { observer } from 'mobx-react-lite';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { adminStore, useAdminInfo } from '@/entities/admin';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { RunnerLoader } from '@/shared/ui/runnerLoader/RunnerLoader';

export const AdminAccessGuard: FunctionComponent<PropsWithChildren> = observer(({ children }) => {
    const { isAdmin, isUserRequestFinished, setUserRequestFinished, setAdmin } = adminStore;

    useAdminInfo({ isUserRequestFinished, setUserRequestFinished, setAdmin });

    if (!isUserRequestFinished) {
        return <RunnerLoader />;
    }

    if (!isAdmin) {
        return <Navigate to={AppRoutes.NOT_FOUND} />;
    }

    return <>{children}</>;
});
