import { FunctionComponent } from 'react';
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

    if (isAuthPageVisited) {
        navigate(RoutePath['admin']);
    }

    dispatch(setAuthPageVisited());

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <iframe
                    id="telegram-login-silverlandmc_bot"
                    src={`https://oauth.telegram.org/embed/silverlandmc_bot?origin=${__IS_DEV__ ? 'http%3A%2F%2Flocalhost:3000' : 'https%3A%2F%2Fsilverland.fun'}&amp;return_to=${__IS_DEV__ ? 'http%3A%2F%2Flocalhost:3000' : 'https%3A%2F%2Fsilverland.fun'}/admin&amp;size=large&amp;request_access=write`}
                    width="338"
                    height="60"
                ></iframe>
                <script
                    async
                    src="https://telegram.org/js/telegram-widget.js?22"
                    data-telegram-login="silverlandmc_bot"
                    data-size="large"
                    data-auth-url="https://silverland.fun/auth/callback"
                    data-request-access="write"
                ></script>
            </Section>
        </div>
    );
};

export default AuthPage;
