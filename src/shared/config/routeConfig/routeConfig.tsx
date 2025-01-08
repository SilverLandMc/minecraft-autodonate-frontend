import { AdminPage } from 'pages/AdminPage';
import { AuthPage } from 'pages/AuthPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ShopPage } from 'pages/ShopPage';
import { TermsOfServicePage } from 'pages/TermsOfServicePage';
import { RouteProps } from 'react-router-dom';

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
