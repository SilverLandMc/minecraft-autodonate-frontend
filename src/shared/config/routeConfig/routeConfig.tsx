import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from '@/pages/notFoundPage';
import { AdminPage } from '../../../pages/adminPage';
import { AuthPage } from '../../../pages/authPage';
import { MainPage } from '../../../pages/mainPage';
import { ShopPage } from '../../../pages/shopPage';
import { TermsOfServicePage } from '../../../pages/termsOfServicePage';

export const enum AppRoutes {
    //region public
    MAIN = 'main',
    SHOP = 'shop',
    TERMS_OF_SERVICE = 'tos',
    // endregion

    AUTHENTICATION = 'auth',
    ADMIN = 'admin',
    NOT_FOUND = 'notFound'
}

export const RoutePath: Record<AppRoutes, string> = {
    //region public
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SHOP]: '/shop',
    [AppRoutes.TERMS_OF_SERVICE]: '/tos',
    // endregion

    [AppRoutes.AUTHENTICATION]: '/auth',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
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
    // endregion

    [AppRoutes.AUTHENTICATION]: {
        path: RoutePath.auth,
        element: <AuthPage />
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFoundPage />
    }
};
