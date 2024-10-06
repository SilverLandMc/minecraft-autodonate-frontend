import { setAuthPageVisited } from 'pages/AdminPage/slices/adminPageSlice';
import { FunctionComponent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import selectAdminPagePart from 'shared/redux/selectors/selectAdminPagePart';
import Section from 'shared/ui/Section/Section';
import styles from './AuthPage.module.scss';

const AuthPage: FunctionComponent = () => {
    const telegramButtonRef = useRef(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAdmin, isAuthPageVisited } = useSelector(selectAdminPagePart);

    useEffectOnce(() => {
        if (isAdmin || isAuthPageVisited) {
            navigate(RoutePath['admin']);
        }

        const buttonRef = telegramButtonRef.current;

        if (buttonRef) {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.setAttribute('data-telegram-login', 'silverlandmc_bot');
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-auth-url', 'https://silverland.fun/auth/callback');
            script.setAttribute('data-request-access', 'write');

            telegramButtonRef.current.appendChild(script);

            return () => {
                dispatch(setAuthPageVisited());

                if (buttonRef) {
                    buttonRef.removeChild(script);
                }
            };
        }
    });

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <div ref={telegramButtonRef} />
            </Section>
        </div>
    );
};

export default AuthPage;
