import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { TermsOfServicePage } from 'pages/TermsOfServicePage';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import { ShopPage } from 'pages/ShopPage';
import { AdminPage } from 'pages/AdminPage';
import { AuthPage } from 'pages/AuthPage';

export const enum AppRoutes {
    MAIN = 'main',
    RANKS = 'ranks',
    BOOSTERS = 'boosters',
    CASES = 'cases',
    RESOURCES = 'resources',
    TERMS_OF_SERVICE = 'tos',
    AUTHENTICATION = 'auth',
    ADMIN = 'admin'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RANKS]: '/ranks',
    [AppRoutes.BOOSTERS]: '/boosters',
    [AppRoutes.CASES]: '/cases',
    [AppRoutes.RESOURCES]: '/resources',
    [AppRoutes.TERMS_OF_SERVICE]: '/tos',
    [AppRoutes.AUTHENTICATION]: '/auth',
    [AppRoutes.ADMIN]: '/admin'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
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
    [AppRoutes.TERMS_OF_SERVICE]: {
        path: RoutePath.tos,
        element: <TermsOfServicePage />
    },
    [AppRoutes.AUTHENTICATION]: {
        path: RoutePath.auth,
        element: <AuthPage />
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />
    }
};
