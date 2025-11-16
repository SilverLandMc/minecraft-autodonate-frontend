import { reatomComponent, useAtom } from '@reatom/npm-react';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { adminStore, useAdminInfo } from '@/entities/admin';
import { AppRoutes } from '@/shared/config/routeConfig';
import { RunnerLoader } from '@/shared/ui/runnerLoader';

export const AdminAccessGuard: FunctionComponent<PropsWithChildren> = reatomComponent(({ children }) => {
    useAdminInfo();

    const [isUserRequestFinished] = useAtom(adminStore.isUserRequestFinished);
    const [isAdmin] = useAtom(adminStore.isAdmin);

    if (!isUserRequestFinished) {
        return <RunnerLoader />;
    }

    if (!isAdmin) {
        return <Navigate to={AppRoutes.NOT_FOUND} />;
    }

    return <>{children}</>;
});
