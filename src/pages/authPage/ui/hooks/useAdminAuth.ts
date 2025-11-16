import { RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import { adminStore } from '@/entities/admin';
import { RoutePath } from '@/shared/config/routeConfig';

interface Params {
    telegramButtonRef: RefObject<HTMLDivElement>;
}

export const useAdminAuth = ({ telegramButtonRef }: Params) => {
    const navigate = useNavigate();

    useEffectOnce(() => {
        if (adminStore.isAdmin() || adminStore.isAuthPageVisited()) {
            navigate(RoutePath['admin']);
        }

        if (!telegramButtonRef?.current) {
            return;
        }

        const buttonRef = telegramButtonRef?.current;

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'silverlandmc_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', 'https://silverland.fun/auth/callback');
        script.setAttribute('data-request-access', 'write');

        telegramButtonRef.current.appendChild(script);

        return () => {
            adminStore.setAuthPageVisited();

            if (buttonRef) {
                buttonRef.removeChild(script);
            }
        };
    });
};
