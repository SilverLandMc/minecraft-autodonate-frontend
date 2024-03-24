import { FunctionComponent, useEffect } from 'react';
import Section from 'shared/ui/Section/Section';
import styles from './AuthPage.module.scss';
import { useSelector } from 'react-redux';
import selectShopPagePart from 'shared/redux/selectors/selectAdminPagePart';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { setAuthPageVisited } from 'pages/AdminPage/slices/adminPageSlice';

const AuthPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthPageVisited } = useSelector(selectShopPagePart);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'silverlandmc_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', 'https://silverland.fun/auth/callback');
        script.setAttribute('data-request-access', 'write');

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    if (isAuthPageVisited) {
        navigate(RoutePath['admin']);
    }

    dispatch(setAuthPageVisited());

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <div id="telegram-button" />
            </Section>
        </div>
    );
};

export default AuthPage;
