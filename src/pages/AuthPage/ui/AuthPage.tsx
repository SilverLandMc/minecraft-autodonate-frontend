import { FunctionComponent, useEffect, useRef } from 'react';
import Section from 'shared/ui/Section/Section';
import styles from './AuthPage.module.scss';
import { useSelector } from 'react-redux';
import selectAdminPagePart from 'shared/redux/selectors/selectAdminPagePart';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { setAuthPageVisited } from 'pages/AdminPage/slices/adminPageSlice';

const AuthPage: FunctionComponent = () => {
    const telegramButtonRef = useRef(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAdmin, isAuthPageVisited } = useSelector(selectAdminPagePart);

    useEffect(() => {
        if (isAdmin || isAuthPageVisited) {
            navigate(RoutePath['admin']);
        }

        if (telegramButtonRef.current) {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.setAttribute('data-telegram-login', 'silverlandmc_bot');
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-auth-url', 'https://silverland.fun/auth/callback');
            script.setAttribute('data-request-access', 'write');

            telegramButtonRef.current.appendChild(script);

            return () => {
                if (telegramButtonRef.current) {
                    telegramButtonRef.current.removeChild(script);
                }
            };
        }
    }, []);

    dispatch(setAuthPageVisited());

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <div ref={telegramButtonRef} />
            </Section>
        </div>
    );
};

export default AuthPage;
