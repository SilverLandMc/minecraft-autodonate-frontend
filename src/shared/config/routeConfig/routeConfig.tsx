import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { TermsOfServicePage } from 'pages/TermsOfServicePage';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import { ShopPage } from 'pages/ShopPage';
import { AdminPage } from 'pages/AdminPage';
import { AuthPage } from 'pages/AuthPage';

export const enum AppRoutes {
    //region public
    MAIN = 'main',
    TERMS_OF_SERVICE = 'tos',
    // endregion

    // region shop
    RANKS = 'ranks',
    BOOSTERS = 'boosters',
    CASES = 'cases',
    RESOURCES = 'resources',
    // endregion

    AUTHENTICATION = 'auth',
    ADMIN = 'admin',
    NOT_FOUND = 'notFound'
}

export const RoutePath: Record<AppRoutes, string> = {
    //region public
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TERMS_OF_SERVICE]: '/tos',
    // endregion

    // region shop
    [AppRoutes.RANKS]: '/ranks',
    [AppRoutes.BOOSTERS]: '/boosters',
    [AppRoutes.CASES]: '/cases',
    [AppRoutes.RESOURCES]: '/resources',
    // endregion

    [AppRoutes.AUTHENTICATION]: '/auth',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.NOT_FOUND]: '/notFound'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    //region public
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.TERMS_OF_SERVICE]: {
        path: RoutePath.tos,
        element: <TermsOfServicePage />
    },
    // endregion

    // region shop
    [AppRoutes.RANKS]: {
        path: RoutePath.ranks,
        element: <ShopPage productCategory={ProductCategory.RANKS} />
    },
    [AppRoutes.BOOSTERS]: {
        path: RoutePath.boosters,
        element: <ShopPage productCategory={ProductCategory.BOOSTERS} />
    },
    [AppRoutes.CASES]: {
        path: RoutePath.cases,
        element: <ShopPage productCategory={ProductCategory.CASES} />
    },
    [AppRoutes.RESOURCES]: {
        path: RoutePath.resources,
        element: <ShopPage productCategory={ProductCategory.RESOURCES} />
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
        element: <AdminPage />
    }
};
