import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';

export const enum AppRoutes {
    MAIN = 'main',
    RANKS = 'ranks',
    BOOSTERS = 'boosters',
    CHESTS = 'chests',
    RESOURCES = 'resources'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RANKS]: '/ranks',
    [AppRoutes.BOOSTERS]: '/boosters',
    [AppRoutes.CHESTS]: '/chests',
    [AppRoutes.RESOURCES]: '/resources'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.RANKS]: {
        path: RoutePath.ranks,
        element: <AboutPage />
    },
    [AppRoutes.BOOSTERS]: {
        path: RoutePath.boosters,
        element: <AboutPage />
    },
    [AppRoutes.CHESTS]: {
        path: RoutePath.chests,
        element: <AboutPage />
    },
    [AppRoutes.RESOURCES]: {
        path: RoutePath.resources,
        element: <AboutPage />
    }
};
