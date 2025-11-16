import { reatomComponent } from '@reatom/react';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { adminStore, useAdminInfo } from '@/entities/admin';
import { AppRoutes } from '@/shared/config/routeConfig';
import { RunnerLoader } from '@/shared/ui/runnerLoader';

export const AdminAccessGuard: FunctionComponent<PropsWithChildren> = reatomComponent(({ children }) => {
    useAdminInfo();

    if (!adminStore.isUserRequestFinished()) {
        return <RunnerLoader />;
    }

    if (!adminStore.isAdmin()) {
        return <Navigate to={AppRoutes.NOT_FOUND} />;
    }

    return <>{children}</>;
});
