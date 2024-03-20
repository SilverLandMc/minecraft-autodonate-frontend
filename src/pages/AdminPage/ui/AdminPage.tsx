import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import styles from './AdminPage.module.scss';
import AdminAccessGuard from 'pages/AdminPage/layouts/AdminAccessGuard';

const AdminPage: FunctionComponent = () => {
    return (
        <AdminAccessGuard>
            <div className={styles.wrapper}>
                <Section className={styles.section}>В разработке</Section>
            </div>
        </AdminAccessGuard>
    );
};

export default AdminPage;
