import Sentry from 'shared/lib/aliases/Sentry';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';

const PAGE_RELOADS_QUERY_PARAMETER = 'componentLoaderReloads';

const setReloadsToQuery = (reloads: number) => {
    const params = new URLSearchParams(window.location.search);
    if (reloads === 0) {
        params.delete(PAGE_RELOADS_QUERY_PARAMETER);
    } else {
        params.set(PAGE_RELOADS_QUERY_PARAMETER, reloads.toString());
    }

    const nextQueryString = params.toString();
    const nextUrl = nextQueryString ? `${window.location.pathname}?${nextQueryString}` : window.location.pathname;

    window.history.replaceState({}, '', nextUrl);
};

const componentLoader = <T>(
    lazyComponent: () => Promise<{ default: T }>,
    attemptsLeft = 3,
    interval = 1000
): Promise<{ default: T }> =>
    new Promise((resolve, reject) => {
        lazyComponent()
            .then((component) => {
                setReloadsToQuery(0);
                resolve(component);
            })
            .catch((error) => {
                const params = new URLSearchParams(window.location.search);
                const pageReloads = Number(params.get(PAGE_RELOADS_QUERY_PARAMETER) ?? 0);

                if (pageReloads === 3) {
                    window.location.href = AppRoutes.NOT_FOUND;
                }

                setTimeout(async () => {
                    if (attemptsLeft === 1) {
                        Sentry.captureMessage('ComponentLoader: failed, reload page');
                        setReloadsToQuery(pageReloads + 1);
                        window.location.reload();
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                        reject(error);
                        return;
                    }
                    componentLoader(lazyComponent, attemptsLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });

export default componentLoader;
