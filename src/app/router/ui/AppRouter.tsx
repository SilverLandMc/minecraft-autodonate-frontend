import { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPage } from '@/pages/adminPage';
import { AuthPage } from '@/pages/authPage';
import { MainPage } from '@/pages/mainPage';
import { NotFoundPage } from '@/pages/notFoundPage';
import { ShopPage } from '@/pages/shopPage';
import { TermsOfServicePage } from '@/pages/termsOfServicePage';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig';
import { RunnerLoader } from '@/shared/ui/runnerLoader';
import { AdminAccessGuard } from '../guards/AdminAccessGuard';
import { RouteDescription } from '../types/types';

const routeConfig: Record<AppRoutes, RouteDescription> = {
    //region public
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.SHOP]: {
        path: RoutePath.shop,
        element: <ShopPage />
    },
    [AppRoutes.TERMS_OF_SERVICE]: {
        path: RoutePath.tos,
        element: <TermsOfServicePage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFoundPage />
    },
    // endregion

    [AppRoutes.AUTHENTICATION]: {
        path: RoutePath.auth,
        element: <AuthPage />
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />,
        layout: AdminAccessGuard
    }
};

export const AppRouter = () => (
    <Suspense fallback={<RunnerLoader />}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element, layout: Layout = Fragment }) => (
                <Route key={path} path={path} element={<Layout>{element}</Layout>} />
            ))}
        </Routes>
    </Suspense>
);
