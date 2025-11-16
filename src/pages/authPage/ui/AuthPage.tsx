import { FunctionComponent, useRef } from 'react';
import { Section } from '@/shared/ui';
import { useAdminAuth } from './hooks/useAdminAuth';
import styles from './AuthPage.module.scss';

const AuthPage: FunctionComponent = () => {
    const telegramButtonRef = useRef<HTMLDivElement>(null);

    useAdminAuth({ telegramButtonRef });

    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <div ref={telegramButtonRef} />
            </Section>
        </div>
    );
};

export default AuthPage;
