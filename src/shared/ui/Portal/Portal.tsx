import { FunctionComponent, PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import createLogger from 'shared/lib/logger/logger';
import Sentry from 'shared/lib/aliases/Sentry';

const logger = createLogger('Portal');

const Portal: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const portalRoot = document.getElementById('portalRoot');
    const element = useMemo(() => {
        const element = document.createElement('div');
        element.dataset.elementType = 'portalChild';
        return element;
    }, []);

    useEffect(() => {
        if (!portalRoot) {
            const errorMessage = 'portalRoot is false';
            logger.error(errorMessage);
            Sentry.captureMessage(errorMessage);
            return;
        }

        portalRoot.appendChild(element);
        return () => {
            portalRoot.removeChild(element);
        };
    }, [element, portalRoot]);

    return portalRoot ? createPortal(children, element) : null;
};

export default Portal;
