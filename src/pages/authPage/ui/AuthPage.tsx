import { observer } from 'mobx-react-lite';
import { FunctionComponent, useRef } from 'react';
import { adminStore } from '@/entities/admin';
import { Section } from '@/shared/ui';
import { useAdminAuth } from './hooks/useAdminAuth';
import styles from './AuthPage.module.scss';

const AuthPage: FunctionComponent = observer(() => {
    const { isAdmin, isAuthPageVisited, setAuthPageVisited } = adminStore;
    const telegramButtonRef = useRef<HTMLDivElement>(null);

    useAdminAuth({ telegramButtonRef, isAuthPageVisited, isAdmin, setAuthPageVisited });

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <div ref={telegramButtonRef} />
            </Section>
        </div>
    );
});

export default AuthPage;
