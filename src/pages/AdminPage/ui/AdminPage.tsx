import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import styles from './AdminPage.module.scss';

const AdminPage: FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <Section className={styles.section}>В разработке</Section>
        </div>
    );
};

export default AdminPage;
