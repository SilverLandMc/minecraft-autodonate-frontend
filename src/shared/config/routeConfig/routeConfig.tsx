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
    [AppRoutes.NOT_FOUND]: '*',
    // endregion

    [AppRoutes.AUTHENTICATION]: '/auth',
    [AppRoutes.ADMIN]: '/admin'
};
