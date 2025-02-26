import { FunctionComponent } from 'react';
import styles from './EnticingCards.module.scss';

export const EnticingCards: FunctionComponent = () => (
    <div className={styles.wrapper}>
        <div className={styles.ranksCard}>
            <h3 className={styles.title}>Ранги</h3>
        </div>

        <div className={styles.boostersCard}>
            <h3 className={styles.title}>Бустеры</h3>
        </div>

        <div className={styles.resourcesCard}>
            <h3 className={styles.title}>Ресурсы</h3>
        </div>
    </div>
);
