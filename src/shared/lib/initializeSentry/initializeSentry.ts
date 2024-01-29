import Sentry from 'shared/lib/aliases/Sentry';
import { ENV_NAME, RELEASE_NAME, SENTRY_DSN, STAND_NAME } from 'shared/config/env/env';
import createLogger from 'shared/lib/logger/logger';

const logger = createLogger('initializeSentry');

const initializeSentry = () => {
    if (!SENTRY_DSN) {
        logger.warning('SENTRY_DSN is falsy, skipping Sentry initialization');
    }

    if (SENTRY_DSN) {
        Sentry.init({
            dsn: SENTRY_DSN,
            environment: STAND_NAME ?? 'development',
            release: RELEASE_NAME ?? 'not versioned',
            initialScope: { tags: { ENV_NAME, STAND_NAME, layer: 'frontend' } },
            integrations: [new Sentry.BrowserTracing()],
            tracesSampleRate: 1
        });

        logger.info('Sentry successfully initialized');
    }
};

export default initializeSentry;
