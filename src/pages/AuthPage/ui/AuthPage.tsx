import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import styles from './AuthPage.module.scss';

const AuthPage: FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <iframe
                    id="telegram-login-silverlandmc_bot"
                    src={`https://oauth.telegram.org/embed/silverlandmc_bot?origin=${__IS_DEV__ ? 'http%3A%2F%2Flocalhost:3000' : 'https%3A%2F%2Fe2ed02d70870.vps.myjino.ru'}&amp;return_to=${__IS_DEV__ ? 'http%3A%2F%2Flocalhost:3000' : 'https%3A%2F%2Fe2ed02d70870.vps.myjino.ru'}/admin&amp;size=large&amp;request_access=write`}
                    width="338"
                    height="60"
                ></iframe>
                <script
                    async
                    src="https://telegram.org/js/telegram-widget.js?22"
                    data-telegram-login="silverlandmc_bot"
                    data-size="large"
                    data-auth-url="https://e2ed02d70870.vps.myjino.ru/auth"
                    data-request-access="write"
                ></script>
            </Section>
        </div>
    );
};

export default AuthPage;
